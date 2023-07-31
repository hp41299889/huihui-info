import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

import CollectionSider from "@/app/component/sider/collection";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Box display="flex">
      <CollectionSider />
      {children}
    </Box>
  );
};

export default Layout;
