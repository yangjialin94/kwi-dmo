import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";

import { formatPrice } from "../lib/utils";
import { useStore } from "../store/useStore";
import CartItem from "./CartItem";

interface CartProps {
  onCloseCart: () => void;
  onSetCheckoutMessage: (message: string) => void;
}

// Cart component
export default function Cart({ onCloseCart, onSetCheckoutMessage }: CartProps) {
  const { cart, totalPrice, totalSavings, checkout } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Handle checkout
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const response = await checkout();

    if (response.success) {
      onSetCheckoutMessage("✅ Checkout Successful!");
      onCloseCart();
    } else {
      onSetCheckoutMessage(`❌ Checkout Failed: ${response.message}`);
    }

    setIsCheckingOut(false);
  };

  return (
    <Box sx={{ width: 350, padding: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" textAlign="center">
        Cart
      </Typography>

      <Divider sx={{ marginY: 1 }} />

      {/* Cart Items */}
      {cart.length === 0 ? (
        <Typography textAlign="center" sx={{ color: "gray" }}>
          No items in cart
        </Typography>
      ) : (
        cart.map((item) => <CartItem key={item.product_id} item={item} />)
      )}

      {/* Total Summary */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          {/* Total Discounts */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" fontWeight="bold" color="error">
              Total Discounts:
            </Typography>
            <Typography variant="body1" color="error">
              {formatPrice(totalSavings)}
            </Typography>
          </Box>

          {/* Subtotal */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" fontWeight="bold">
              Subtotal:
            </Typography>
            <Typography variant="body1">{formatPrice(totalPrice)}</Typography>
          </Box>

          {/* Tax (Hardcoded) */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" fontWeight="bold">
              Tax:
            </Typography>
            <Typography variant="body1">{formatPrice(0)}</Typography>
          </Box>

          {/* Total */}
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6">{formatPrice(totalPrice)}</Typography>
          </Box>

          {/* Checkout Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, borderRadius: 2, fontWeight: "bold" }}
            disabled={isCheckingOut}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}
