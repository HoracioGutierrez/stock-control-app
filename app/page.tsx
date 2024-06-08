import { auth } from "@/auth";
import BarCodeScanner from "@/components/BarCodeScanner";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {

  const session = await auth()

  return (
    <main className="p-4">
      {session ? <LogoutButton /> : <LoginButton />}
    </main>
  );
}
