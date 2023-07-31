import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Box display="flex" justifyContent="center" paddingTop="64px">
      {children}
    </Box>
  );
};

export default Layout;
