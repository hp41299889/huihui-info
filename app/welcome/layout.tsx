import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 16px)"
      width="80%"
      margin="auto"
    >
      {children}
    </Box>
  );
};

export default Layout;
