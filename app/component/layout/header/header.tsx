import { FC } from "react";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";

import { pages } from "./option";
import Linker from "@/app/component/link/linker/linker";

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
          {pages.map((p, i) => (
            <Linker
              key={`headerLinker_${i}`}
              {...p}
              type="BUTTON"
              style={{ color: "black" }}
            />
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
