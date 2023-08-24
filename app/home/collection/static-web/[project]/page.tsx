"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  console.log(params);

  return <>{params.project}</>;
};

export default Page;
