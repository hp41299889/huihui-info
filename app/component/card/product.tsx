import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

import { ProductProps } from "./interface";

const Product: FC<ProductProps> = (props: ProductProps) => {
  const { name, price, img } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" image={img} height="260px" />
        <CardContent>
          <Stack>
            <Typography variant="h6">{name}</Typography>
            <Typography fontWeight={600}>${price}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
