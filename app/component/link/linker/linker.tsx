import { CSSProperties, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";

import { ImageLinker, LinkerType } from "./interface";

interface Props {
  href: string;
  type: LinkerType;
  label?: string;
  img?: ImageLinker;
  style?: CSSProperties;
}

const Linker: FC<Props> = (props: Props) => {
  const { href, type, label, img, style } = props;
  const renderLink = () => {
    switch (type) {
      case "BUTTON": {
        return <Button sx={style}>{label}</Button>;
      }
      case "ICON": {
        return img ? <Image {...img} /> : <></>;
      }
    }
  };

  return <Link href={href}>{renderLink()}</Link>;
};

export default Linker;
