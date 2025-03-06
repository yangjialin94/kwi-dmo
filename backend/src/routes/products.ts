import { Router } from "express";
import { Database } from "sqlite";

// Product routes
const productRoutes = (db: Database) => {
  const router = Router();

  // Get all products
  router.get("/", async (req, res) => {
    try {
      const products = await db.all("SELECT * FROM products");
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: `❌ Failed to fetch products: ${error}` });
    }
  });

  return router;
};

export default productRoutes;
