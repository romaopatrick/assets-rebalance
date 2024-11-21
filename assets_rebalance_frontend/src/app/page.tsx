import { finAssetsBankService } from "@/services/fin-assets-bank/fin-assets-bank-service";
import Image from "next/image";

type HomeProps = {
  data: any
}
export default async function Home({ data }: HomeProps) {

  
  return (
    <div className="">
      {JSON.stringify(await getAllBanks())}
    </div>
  );
}

export async function getAllBanks() {
  const res = await finAssetsBankService.all()
  if(res.isError())
    console.log(res)

  return res.value
}