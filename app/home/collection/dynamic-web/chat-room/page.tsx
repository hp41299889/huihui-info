import { Box, Button, List, Stack, TextField } from "@mui/material";
import { FC } from "react";

const Page: FC = () => {
  return (
    <Box height="100%" width="100%" paddingRight="96px" display="flex">
      <Stack width="100%">
        <List>me:hi</List>
        <Stack direction="row" display="flex" marginTop="auto">
          <TextField fullWidth />
          <Button variant="contained">送出</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Page;
