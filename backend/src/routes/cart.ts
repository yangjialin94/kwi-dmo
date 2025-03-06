import { Router } from "express";
import { Database } from "sqlite";

// Cart routes
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

  // Add product to cart (or handle quantity changes)
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
        const quantityChanges = product_qty ? parseInt(product_qty, 10) : 1;
        if (isNaN(quantityChanges)) {
          return res.status(400).json({ message: "❌ Invalid quantity" });
        }

        // Check if product exists
        const product = await db.get("SELECT * FROM products WHERE id = ?", [product_id]);
        if (!product) {
          return res.status(404).json({ message: "❌ Product not found" });
        }

        // Check if item exists in cart
        const cartItem = await db.get("SELECT * FROM cart WHERE product_id = ?", [product_id]);
        if (cartItem) {
          // Calculate new quantity
          const newQuantity = cartItem.quantity + quantityChanges;

          // If new quantity is ≤ 0
          if (newQuantity <= 0) {
            await db.run("DELETE FROM cart WHERE product_id = ?", [product_id]);
          } else {
            // Update cart item
            const appliedDiscount = Math.min(cartItem.discount, cartItem.price);
            const newSubtotal = (cartItem.price - appliedDiscount) * newQuantity;
            const newSavings = appliedDiscount * newQuantity;

            await db.run(
              "UPDATE cart SET quantity = ?, subtotal = ?, savings = ? WHERE product_id = ?",
              [newQuantity, newSubtotal, newSavings, product_id]
            );
          }
        } else {
          // If removing an item that is not in the cart
          if (quantityChanges < 0) {
            return res
              .status(400)
              .json({ message: "❌ Cannot remove an item that is not in the cart" });
          }

          // Add new item to cart
          const appliedDiscount = Math.min(product.discount, product.price);
          const subtotal = (product.price - appliedDiscount) * quantityChanges;
          const savings = appliedDiscount * quantityChanges;

          await db.run(
            "INSERT INTO cart (product_id, name, price, discount, image, quantity, subtotal, savings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              product.id,
              product.name,
              product.price,
              appliedDiscount,
              product.image,
              quantityChanges,
              subtotal,
              savings,
            ]
          );
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

  // Remove a product from cart
  router.delete("/remove/:product_id", async (req, res) => {
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
