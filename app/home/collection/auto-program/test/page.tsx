import { getClients } from "@/util/client/api";

const Page = async () => {
  const clients = await getClients();
  console.log(clients);

  return <></>;
};

export default Page;
