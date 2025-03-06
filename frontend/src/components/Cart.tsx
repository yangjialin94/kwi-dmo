import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, CardMedia, IconButton, Typography } from "@mui/material";

import { API_DOMAIN } from "../lib/constants";
import { formatPrice } from "../lib/utils";
import { useStore } from "../store/useStore";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useStore();

  const total = Array.isArray(cart) ? cart.reduce((acc, p) => acc + p.price * p.quantity, 0) : 0;

  const handleIncreaseQuantity = (productId: number) => {
    addToCart(productId);
  };

  const handleDecreaseQuantity = (productId: number, quantity: number) => {
    if (quantity > 1) {
      removeFromCart(productId);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <Box sx={{ width: 350, padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        cart.map((item) => (
          <Box
            key={item.product_id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingY: 1,
              borderBottom: "1px solid #ddd",
            }}
          >
            {/* Product Image */}
            <CardMedia
              component="img"
              image={`${API_DOMAIN}${item.image}`}
              alt={item.name}
              sx={{ width: 50, height: 50, objectFit: "contain", borderRadius: 1 }}
            />

            {/* Product Info */}
            <Box sx={{ flex: 1, marginLeft: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(item.price)} x {item.quantity} ={" "}
                {formatPrice(item.price * item.quantity)}
              </Typography>
            </Box>

            {/* Quantity Selector */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: 2,
                paddingX: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleDecreaseQuantity(item.product_id, item.quantity)}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ minWidth: 24, textAlign: "center" }}
              >
                {item.quantity}
              </Typography>
              <IconButton size="small" onClick={() => handleIncreaseQuantity(item.product_id)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Remove Button */}
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemoveProduct(item.product_id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))
      )}
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: {formatPrice(total)}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginTop: 2, borderRadius: 2, fontWeight: "bold" }}
      >
        Checkout
      </Button>
    </Box>
  );
}
