import { auth } from "@/auth";
import { cn } from "@/lib/utils";

export default async function Home() {

  const session = await auth()

  return (
    <main className="grid grid-cols-1 md:grid-cols-[300px_1fr] grow">
      <div id="sidebar" className={cn("hidden md:block p-4 h-full", session && "border-r border-slate-400 bg-primary-foreground")}>
        sidebar
      </div>
      <div id="content" className="p-4">
        content
      </div>
    </main>
  );
}
