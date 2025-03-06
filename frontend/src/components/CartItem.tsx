import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, CardMedia, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { API_DOMAIN } from "../lib/constants";
import { CartItem as CartItemType } from "../lib/types";
import { formatPrice } from "../lib/utils";
import { useStore } from "../store/useStore";

interface CartItemProps {
  item: CartItemType;
}

// CartItem component
const CartItem = ({ item }: CartItemProps) => {
  const { addToCart, removeFromCart } = useStore();

  const [quantity, setQuantity] = useState(item.quantity);

  const itemDiscount = (item.price * item.discount) / 100;
  const discountedPrice = item.price - itemDiscount;
  const subtotal = discountedPrice * item.quantity;

  // Update quantity state when item quantity changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <Box
      key={item.product_id}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingY: 2,
        paddingX: 2,
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Row 1 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
        {/* Image */}
        <CardMedia
          component="img"
          image={`${API_DOMAIN}${item.image}`}
          alt={item.name}
          sx={{ width: 60, height: 60, objectFit: "contain", borderRadius: 1 }}
        />

        {/* Product Info */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" sx={{ color: "gray" }}>
            UPC: {item.product_id}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            {formatPrice(discountedPrice)} x {item.quantity}
          </Typography>
        </Box>

        {/* Price */}
        <Typography variant="body2" fontWeight="bold">
          {formatPrice(subtotal)}
        </Typography>
      </Box>

      {/* Row 2 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 1,
          width: "100%",
        }}
      >
        {/* Quantity Selector */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 2,
            paddingX: 1,
            width: "110px",
            justifyContent: "space-between",
            marginLeft: 9,
          }}
        >
          <IconButton size="small" onClick={() => addToCart(item.product_id, -1)}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" fontWeight="bold" sx={{ minWidth: 24, textAlign: "center" }}>
            {quantity}
          </Typography>
          <IconButton size="small" onClick={() => addToCart(item.product_id, 1)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Remove Button */}
        <IconButton
          size="small"
          color="error"
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
          }}
          onClick={() => removeFromCart(item.product_id)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
