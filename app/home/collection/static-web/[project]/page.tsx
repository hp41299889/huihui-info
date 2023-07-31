"use client";
import { FC } from "react";
import { useParams } from "next/navigation";

const Page: FC = () => {
  const params = useParams();
  console.log(params);

  return <>{params.project}</>;
};

export default Page;
