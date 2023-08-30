import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";

import { pages } from "./option";
import Link from "@/app/component/link/link";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Button>
            <Typography color="black" sx={{ fontWeight: 600 }}>
              LOGO
            </Typography>
          </Button>
          {pages.map((p, i) => (
            <Link key={`headerLink_${i}`} href={p.href}>
              {p.label}
            </Link>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
