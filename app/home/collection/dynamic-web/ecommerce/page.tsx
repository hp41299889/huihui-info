import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FC } from "react";

import { ProductProps } from "@/app/component/card/interface";
import Product from "@/app/component/card/product";

const fake: ProductProps[] = [
  { name: "t-shirt", price: 99, img: "" },
  { name: "jean", price: 333, img: "" },
  { name: "watch", price: 4333, img: "" },
  { name: "backpack", price: 1666, img: "" },
  { name: "sneaker", price: 2222, img: "" },
];

const Page: FC = () => {
  const products = fake;

  return (
    <Box paddingY="16px">
      <Grid container spacing={3}>
        {products.map((p, i) => (
          <Grid key={`productCard_${i}`} lg={3}>
            <Product {...p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
