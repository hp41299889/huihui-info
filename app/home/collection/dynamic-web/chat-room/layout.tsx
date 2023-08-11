import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Box height="calc(100vh - 64px)" width="100%" display="flex">
      {children}
    </Box>
  );
};

export default Layout;
