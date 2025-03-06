import { Router } from "express";
import { Database } from "sqlite";
import productRoutes from "./products";
import cartRoutes from "./cart";

// Main routes
const routes = (db: Database) => {
  const router = Router();

  router.use("/products", productRoutes(db));
  router.use("/cart", cartRoutes(db));

  return router;
};

export default routes;
