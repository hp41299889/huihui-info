import { ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FC } from "react";

const EcommerceNav: FC = () => {
  return (
    <>
      <IconButton>
        <ShoppingCart />
      </IconButton>
    </>
  );
};

export default EcommerceNav;
