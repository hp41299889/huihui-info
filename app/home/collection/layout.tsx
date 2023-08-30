"use client";
import { Box } from "@mui/material";
import { FC, ReactNode, useState } from "react";

import CollectionSider from "@/app/component/layout/sider/collection";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props: Props) => {
  const { children } = props;
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };
  return (
    <Box display="flex">
      <CollectionSider collapsed={siderCollapsed} onToggle={toggleSider} />
      <Box
        width="100%"
        m={2}
        ml={siderCollapsed ? 15 : 33}
        bgcolor="white"
        borderRadius={5}
        p={3}
        sx={{
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
