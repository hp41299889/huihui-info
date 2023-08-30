"use client";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { usePathname } from "next/navigation";

import Link from "@/app/component/link/link";

interface Item {
  title: string;
  href: string;
  icon?: ReactElement;
}

interface Group {
  title: string;
  children: Items;
  icon: ReactElement;
}

export type Items = Array<Item | Group>;

interface Props {
  items: Items;
  level: number;
  collapsed: boolean;
}

const RecursiveList = (props: Props) => {
  const { items, level, collapsed } = props;
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItemOpen = (title: string) =>
    setOpenItems((pre) =>
      pre.includes(title) ? pre.filter((i) => i !== title) : [...pre, title]
    );

  return (
    <>
      {items.map((item, i) =>
        "children" in item ? (
          <div key={`list_group_${item.title}`}>
            <ListItemButton onClick={() => toggleItemOpen(item.title)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.title} />}
              {openItems.includes(item.title) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openItems.includes(item.title)}>
              <List>
                <RecursiveList
                  items={item.children}
                  level={level + 1}
                  collapsed={collapsed}
                />
              </List>
            </Collapse>
          </div>
        ) : (
          <Link key={`list_item_${item.title}`} href={item.href}>
            <ListItem>
              <ListItemButton
                selected={pathname === item.href}
                sx={{ pl: level === 0 ? "" : `${level * 30}px` }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.title} />}
              </ListItemButton>
            </ListItem>
          </Link>
        )
      )}
    </>
  );
};

export default RecursiveList;
