import { FC } from "react";
import { redirect } from "next/navigation";

const Page: FC = () => {
  redirect("/home");
};

export default Page;
