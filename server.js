import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Urban Runner Sneakers",
    category: "Footwear",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Comfortable everyday sneakers with a lightweight design and modern streetwear look."
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    category: "Fashion",
    price: 3199,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    description: "A versatile denim jacket designed for casual outfits and everyday wear."
  },
  {
    id: 3,
    name: "Minimal Smart Watch",
    category: "Electronics",
    price: 5499,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description: "A clean smart watch with activity tracking, notifications and a bright display."
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Wireless over-ear headphones with immersive sound and comfortable ear cushions."
  },
  {
    id: 5,
    name: "Everyday Backpack",
    category: "Accessories",
    price: 1899,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description: "Spacious and durable backpack for college, work and travel."
  },
  {
    id: 6,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 1299,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    description: "Timeless sunglasses with a lightweight frame and UV-protective lenses."
  },
  {
    id: 7,
    name: "Premium Hoodie",
    category: "Fashion",
    price: 2299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    description: "Soft premium hoodie with a relaxed fit for comfortable everyday styling."
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 4599,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    description: "Responsive mechanical keyboard built for coding, gaming and productivity."
  }
];

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "ShopSphere API is running"
  });
});

app.get("/api/products", (req, res) => {
  const search = (req.query.search || "").toLowerCase();
  const category = req.query.category || "All";

  const result = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`ShopSphere API running at http://localhost:${PORT}`);
});