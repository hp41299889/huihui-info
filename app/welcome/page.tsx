"use client";
import { useState } from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import LoginLayout from "./layout";
import LoginForm from "../component/form/login";
import RegisterForm from "../component/form/register";

type FormType = "login" | "register";

const Page = () => {
  const [formType, setFormType] = useState<FormType>("login");

  return (
    <LoginLayout>
      <Box width="100%">
        <Grid container>
          <Grid lg={7}>惠</Grid>
          <Grid lg={5}>
            <Container>
              {formType === "login" && (
                <LoginForm onSwitchToRegister={() => setFormType("register")} />
              )}
              {formType === "register" && (
                <RegisterForm onSwitchToLogin={() => setFormType("login")} />
              )}
            </Container>
          </Grid>
        </Grid>
      </Box>
    </LoginLayout>
  );
};

export default Page;
