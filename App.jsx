import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="logo">
          Shop<span>Sphere</span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart
            <span className="cart-count">{cartCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-info">
        <span className="category">{product.category}</span>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className="rating">⭐ {product.rating}</div>

        <div className="product-bottom">
          <strong>₹{product.price}</strong>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/products?search=${encodeURIComponent(
            search
          )}&category=${encodeURIComponent(category)}`
        );

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div>
            <p className="eyebrow">MODERN ONLINE SHOPPING</p>

            <h1>
              Discover products
              <br />
              you'll love.
            </h1>

            <p className="hero-text">
              Explore our collection of fashion, electronics and
              everyday essentials.
            </p>

            <a href="#products" className="hero-button">
              Explore Products
            </a>
          </div>

          <div className="hero-card">
            <div className="hero-circle">🛍️</div>
            <h3>ShopSphere</h3>
            <p>Simple. Modern. Smart.</p>
          </div>
        </div>
      </section>

      <main className="container" id="products">
        <section className="products-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Featured Products</h2>
            </div>

            <p>{products.length} products</p>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="empty">
              <h3>No products found</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <div className="loading">Loading product...</div>;
  }

  return (
    <main className="container">
      <section className="details">
        <img src={product.image} alt={product.name} />

        <div className="details-content">
          <span className="category">{product.category}</span>

          <h1>{product.name}</h1>

          <div className="rating">⭐ {product.rating}</div>

          <h2>₹{product.price}</h2>

          <p>{product.description}</p>

          <button
            className="primary-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <br />

          <Link to="/" className="back-link">
            ← Back to Products
          </Link>
        </div>
      </section>
    </main>
  );
}

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <main className="container page">
      <p className="eyebrow">YOUR SHOPPING BAG</p>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty">
          <h2>Your cart is empty 🛒</h2>
          <Link to="/" className="primary-button">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div>
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <strong>₹{product.price}</strong>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
        </>
      )}
    </main>
  );
}

function About() {
  return (
    <main className="container page about">
      <p className="eyebrow">ABOUT US</p>

      <h1>Welcome to ShopSphere.</h1>

      <p>
        ShopSphere is a modern full-stack product catalog built
        using React and Node.js.
      </p>

      <div className="about-grid">
        <div>
          <h3>⚡ Fast</h3>
          <p>Simple and responsive shopping experience.</p>
        </div>

        <div>
          <h3>🔒 Reliable</h3>
          <p>Products are served through a REST API.</p>
        </div>

        <div>
          <h3>📱 Responsive</h3>
          <p>Designed to work across different screen sizes.</p>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const alreadyAdded = currentCart.some(
        (item) => item.id === product.id
      );

      if (alreadyAdded) {
        return currentCart;
      }

      return [...currentCart, product];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <Header cartCount={cart.length} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>

      <footer>
        <div className="container footer-content">
          <strong>ShopSphere</strong>
          <span>© 2026 ShopSphere. Built with React + Node.js.</span>
        </div>
      </footer>
    </>
  );
}

export default App;