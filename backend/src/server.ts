import express, { Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const PORT = 8000;

// Initialize Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

/**
 * Initialize SQLite Database
 */
const initializeDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Recreate tables
  await db.exec(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS cart;
    
    CREATE TABLE products (
      id Text PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      discount INTEGER DEFAULT 0,
      image TEXT
    );
    
    CREATE TABLE cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER DEFAULT 1,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  // Load sample data
  await db.exec(`
    INSERT INTO products (id, name, price, discount, image) VALUES
    ('000000000001', 'iPhone 15 Pro', 999.99, 50, '/images/iphone15pro.jpg'),
    ('000000000002', 'MacBook Pro 16', 2499.99, 100, '/images/macbookpro.jpg'),
    ('000000000003', 'iPad Pro 12.9', 1099.99, 0, '/images/ipadpro.jpg'),
    ('000000000004', 'Apple Watch Ultra', 799.99, 50, '/images/applewatch.jpg'),
    ('000000000005', 'AirPods Pro 2', 249.99, 20, '/images/airpods.jpg');
  `);

  return db;
};

/**
 * Routes
 */
initializeDB().then((db) => {
  // Test Route
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "✅ Backend is working!" });
  });

  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const products = await db.all("SELECT * FROM products");
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: `❌ Failed to fetch products: ${error}` });
    }
  });

  // Get products in cart
  app.get("/api/cart", async (req: Request, res: Response) => {
    try {
      const cart = await db.all("SELECT * FROM cart");
      res.json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: `❌ Failed to fetch cart: ${error}` });
    }
  });

  // Add product to cart
  app.post("/api/cart/add", async (req: Request, res: Response) => {
    (async () => {
      try {
        // Validate request
        const { product_id } = req.body;
        if (!product_id) {
          return res.status(400).json({ message: "❌ Product ID is required" });
        }

        // Check if product exists
        const product = await db.get("SELECT * FROM products WHERE id = ?", [product_id]);
        if (!product) {
          return res.status(404).json({ message: "❌ Product not found" });
        }

        // Update cart
        const existingItem = await db.get("SELECT * FROM cart WHERE product_id = ?", [product_id]);
        if (existingItem) {
          await db.run("UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?", [
            product_id,
          ]);
        } else {
          await db.run("INSERT INTO cart (product_id, name, price, quantity) VALUES (?, ?, ?, ?)", [
            product.id,
            product.name,
            product.price,
            1,
          ]);
        }

        // Return updated cart
        const updatedCart = await db.all("SELECT * FROM cart");
        res.json({
          success: true,
          message: "✅ Product added to cart",
          cart: updatedCart,
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: `❌ Failed to add to cart: ${error}` });
      }
    })();
  });

  // Remove product from cart (by product_id)
  app.delete("/api/cart/:product_id", async (req: Request, res: Response) => {
    try {
      const { product_id } = req.params;
      await db.run("DELETE FROM cart WHERE product_id = ?", [product_id]);
      res.json({ success: true, message: "✅ Product removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: `❌ Failed to remove from cart: ${error}` });
    }
  });

  // Checkout (Clear cart)
  app.post("/api/checkout", async (req: Request, res: Response) => {
    try {
      await db.run("DELETE FROM cart");
      res.json({ success: true, message: "✅ Checkout successful" });
    } catch (error) {
      console.error("Error during checkout:", error);
      res.status(500).json({ message: `❌ Failed to checkout: ${error}` });
    }
  });

  // Start Server
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});
