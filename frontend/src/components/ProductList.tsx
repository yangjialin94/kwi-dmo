import { Box } from "@mui/material";

import { useStore } from "../store/useStore";
import ProductCard from "./ProductCard";

// ProductList component
export default function ProductList() {
  const { products } = useStore();

  return (
    <Box
      sx={{
        display: "grid",
        paddingTop: 2,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
        justifyItems: "center",
        width: "100%",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
