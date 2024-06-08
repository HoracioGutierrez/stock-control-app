import { auth } from "@/auth";
import BarCodeScanner from "@/components/BarCodeScanner";
import LoginButton from "@/components/LoginButton";

export default async function Home() {

  const session = await auth()
  console.log(session)

  return (
    <main className="p-4">
      <LoginButton/>
    </main>
  );
}
