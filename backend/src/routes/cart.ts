import { Router } from "express";
import { Database } from "sqlite";

/**
 * Cart routes
 */
const cartRoutes = (db: Database) => {
  const router = Router();

  // Get all cart items
  router.get("/", async (req, res) => {
    try {
      const cart = await db.all("SELECT * FROM cart");
      res.json(cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: `❌ Failed to fetch cart: ${error}` });
    }
  });

  // Add product to cart
  router.post("/add", (req, res) => {
    // Without doing this will cause an error
    (async () => {
      try {
        const { product_id, product_qty } = req.body;

        // Validate ID
        if (!product_id) {
          return res.status(400).json({ message: "❌ Product ID is required" });
        }

        // Validate quantity
        const quantity = product_qty ? parseInt(product_qty, 10) : 1;
        if (quantity < 1) {
          return res.status(400).json({ message: "❌ Invalid quantity" });
        }

        // Check if product exists
        const product = await db.get("SELECT * FROM products WHERE id = ?", [product_id]);
        if (!product) {
          return res.status(404).json({ message: "❌ Product not found" });
        }

        // Update cart
        const existingItem = await db.get("SELECT * FROM cart WHERE product_id = ?", [product_id]);
        if (existingItem) {
          await db.run("UPDATE cart SET quantity = quantity + ? WHERE product_id = ?", [
            quantity,
            product_id,
          ]);
        } else {
          await db.run("INSERT INTO cart (product_id, name, price, quantity) VALUES (?, ?, ?, ?)", [
            product.id,
            product.name,
            product.price,
            quantity,
          ]);
        }

        // Return updated cart
        const updatedCart = await db.all("SELECT * FROM cart");
        res.json({ success: true, message: "✅ Product added to cart", cart: updatedCart });
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: `❌ Failed to add to cart: ${error}` });
      }
    })();
  });

  // Remove product from cart
  router.delete("/:product_id", async (req, res) => {
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
  router.post("/checkout", async (req, res) => {
    try {
      await db.run("DELETE FROM cart");
      res.json({ success: true, message: "✅ Checkout successful" });
    } catch (error) {
      console.error("Error during checkout:", error);
      res.status(500).json({ message: `❌ Failed to checkout: ${error}` });
    }
  });

  return router;
};

export default cartRoutes;
