import BarCodeScanner from "@/components/BarCodeScanner";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold">Control de Stock</h1>
      <BarCodeScanner/>
    </main>
  );
}
