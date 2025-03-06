import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Popover,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { PORTFOLIO_URL } from "../lib/constants";
import { useStore } from "../store/useStore";
import Cart from "./Cart";

// Header component
export default function Header() {
  const { totalQuantity } = useStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // Handle cart popover
  const handleOpenCart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#40444D" }}>
      <Toolbar className="flex justify-between">
        {/* Navigation to Jialin's portfolio website */}
        <Box
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            borderRadius: 3,
            paddingX: "10px",
            paddingY: "2px",
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href={`${PORTFOLIO_URL}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: "600", color: "inherit" }}
          >
            JY
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "600" }}
          className="absolute left-1/2 -translate-x-1/2 transform"
        >
          STORE
        </Typography>

        {/* Cart */}
        <Box className="flex flex-1 justify-end">
          <IconButton
            color="inherit"
            onClick={handleOpenCart}
            sx={{
              transition: "background-color 0.3s ease",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Cart Popover */}
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseCart}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: "350px",
                maxHeight: "500px",
                overflowY: "auto",
                borderRadius: 3,
              },
            }}
          >
            <Cart onCloseCart={handleCloseCart} onSetCheckoutMessage={setCheckoutMessage} />
          </Popover>
        </Box>
      </Toolbar>

      {/* Snackbar for checkout message */}
      <Snackbar
        open={Boolean(checkoutMessage)}
        autoHideDuration={3000}
        onClose={() => setCheckoutMessage("")}
        message={checkoutMessage}
      />
    </AppBar>
  );
}
