"use client";
import { FC, useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
interface Page {
  label: string;
  link: string;
}
const pages: Page[] = [
  { label: "關於我", link: "/home/aboutme" },
  { label: "服務項目", link: "/home/service" },
  { label: "作品瀏覽", link: "/home/collection" },
  { label: "合作聯絡", link: "/home/contact" },
];

const Header: FC = () => {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Button>
            <Typography color="black" sx={{ fontWeight: 600 }}>
              LOGO
            </Typography>
          </Button>
          {pages.map((page) => (
            <Link key={page.link} href={page.link}>
              <Button sx={{ color: "black" }}>{page.label}</Button>
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
