"use client";
import { FC } from "react";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import Link from "next/link";

const Messenger: FC = () => {
  return (
    <Box position="fixed" bottom={24} right={24}>
      <Stack rowGap={2}>
        <Link href="https://www.facebook.com/profile.php?id=100094935322100">
          <Image
            src="/icon/messenger.svg"
            alt="fb"
            width={64}
            height={64}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Link href="https://line.me/ti/p/nS3htUh-Zg">
          <Image
            src="/icon/line.png"
            alt="line"
            width={64}
            height={64}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </Stack>
    </Box>
  );
};

export default Messenger;
