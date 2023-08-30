"use client";
import { Box, Divider, IconButton, List, Tooltip } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Grading,
  HdrAuto,
  Settings,
  Web,
} from "@mui/icons-material";

import RecursiveList, { Items } from "./recursiveList";

const items: Items = [
  {
    title: "靜態網頁",
    icon: <Web color="primary" />,
    children: [],
  },
  {
    title: "後臺管理系統",
    icon: <Settings color="primary" />,
    children: [
      {
        title: "客戶訂單管理",
        icon: <Grading color="primary" />,
        href: "/home/collection/background-management-system/client-order-management",
      },
    ],
  },
  {
    title: "自動化程式",
    icon: <HdrAuto color="primary" />,
    children: [
      // {
      //   label: "test",
      //   href: "/home/collection/auto-program/test",
      // },
    ],
  },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const CollectionSider = (props: Props) => {
  const { collapsed, onToggle } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={collapsed ? "100px" : "250px"}
      height="100vh"
      position="fixed"
      bgcolor="#101418"
      color="white"
      sx={{
        transition: "width 0.3s ease-in-out",
      }}
    >
      <List component="nav">
        <RecursiveList items={items} level={0} collapsed={collapsed} />
      </List>
      <Divider />
      <Tooltip title={!collapsed ? "折疊" : "展開"} onClick={onToggle}>
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CollectionSider;
