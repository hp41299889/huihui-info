import Image from "next/image";
import { Box, Stack } from "@mui/material";
import Link from "next/link";

import { messengers } from "./option";

const Messenger = () => {
  return (
    <Box position="fixed" bottom={24} right={24}>
      <Stack rowGap={2}>
        {messengers.map((m, i) => (
          <Link key={`messenger_${i}`} href={m.href}>
            <Image {...m} />
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default Messenger;
