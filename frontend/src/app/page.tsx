"use client";

import { Container } from "@mui/material";
import { useEffect } from "react";

import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { useStore } from "../store/useStore";

// Home page
export default function HomePage() {
  const { fetchData } = useStore();

  // Fetch products and cart data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="flex min-h-screen min-w-screen flex-col bg-black">
      {/* Header */}
      <Header />

      {/* Products Panel */}
      <Container
        maxWidth={false}
        sx={{ backgroundColor: "#F6F6F6", flexGrow: 1 }}
        className="flex w-full flex-col items-center justify-start p-4"
      >
        {/* Product List */}
        <ProductList />
      </Container>
    </main>
  );
}
