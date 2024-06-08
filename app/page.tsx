import { auth } from "@/auth";

export default async function Home() {

  const session = await auth()

  return (
    <main className="p-4">
      Home
    </main>
  );
}
