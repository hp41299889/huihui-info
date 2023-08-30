import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

import Header from "@/app/component/layout/header/header";
import Messenger from "@/app/component/layout/sider/messenger";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Box>
      <Header />
      {children}
      <Messenger />
    </Box>
  );
};

export default Layout;
