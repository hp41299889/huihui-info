import { FC } from "react";

interface Props {
  params: Params;
}

interface Params {
  product: string;
}

const Page = (props: Props) => {
  console.log(props.params);

  return <></>;
};

export default Page;
