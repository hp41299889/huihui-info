"use client";
import { useParams } from "next/navigation";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC, useState } from "react";
import Link from "next/link";

interface Item {
  label: string;
  href?: string;
  children?: Item[];
}

const items: Item[] = [
  {
    label: "靜態網頁",
    children: [
      // {
      //   label: "123",
      //   href: "/home/collection/static-web/123",
      // },
    ],
  },
  {
    label: "後臺管理系統",
    children: [
      {
        label: "客戶訂單管理",
        href: "/home/collection/background-management-system/client-order-management",
      },
    ],
  },
  {
    label: "自動化程式",
    children: [
      // {
      //   label: "test",
      //   href: "/home/collection/auto-program/test",
      // },
    ],
  },
];
const CollectionSider: FC = () => {
  const [open, setOpen] = useState<boolean[]>(items.map(() => false));
  const params = useParams();

  return (
    <Box
      border="solid 1px"
      borderColor="gray"
      width="100%"
      maxWidth={360}
      marginRight="32px"
    >
      <List component="nav">
        {items.map((item, index) => (
          <div key={item.label}>
            <ListItemButton
              onClick={() =>
                setOpen(open.map((o, i) => (i === index ? !o : o)))
              }
            >
              <ListItemText>{item.label}</ListItemText>
              {open[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[index]}>
              <List component="div" sx={{ paddingLeft: "16px" }}>
                {item.children?.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href ? c.href : ""}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <ListItemButton
                      selected={
                        c.href?.split("/").findLast((v) => v) === params.project
                      }
                    >
                      <ListItemText secondary={c.label} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default CollectionSider;
