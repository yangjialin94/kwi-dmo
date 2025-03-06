import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useState } from "react";

import { API_DOMAIN } from "../lib/constants";
import { Product } from "../lib/types";
import { formatPrice } from "../lib/utils";
import { useStore } from "../store/useStore";

// ProductCard component
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();

  const [quantity, setQuantity] = useState(1);

  // Handle quantity state
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    addToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <Card sx={{ width: "250px", boxShadow: 3, borderRadius: 3, position: "relative" }}>
      {/* Image */}
      <CardMedia
        component="img"
        image={`${API_DOMAIN}${product.image}`}
        alt={product.name}
        sx={{
          height: 250,
          width: "100%",
          padding: 4,
          objectFit: "cover",
        }}
      />

      <CardContent>
        {/* UPC */}
        <Typography variant="caption">UPC: {product.id}</Typography>

        {/* Name */}
        <Typography variant="body1" fontWeight="bold" sx={{ marginTop: 1 }}>
          {product.name}
        </Typography>

        {/* Prices */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
          {/* Current Price */}
          {product.discount > 0 && (
            <Typography variant="body1">{formatPrice(product.price - product.discount)}</Typography>
          )}

          {/* Original Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: product.discount > 0 ? "line-through" : "none" }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
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
            }}
          >
            <IconButton size="small" onClick={handleDecreaseQuantity}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{ minWidth: 24, textAlign: "center" }}
            >
              {quantity}
            </Typography>
            <IconButton size="small" onClick={handleIncreaseQuantity}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Add Button */}
          <Button
            variant="contained"
            size="small"
            onClick={handleAddToCart}
            sx={{ borderRadius: 2, fontWeight: "bold" }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
