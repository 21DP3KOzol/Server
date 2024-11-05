import { auth } from "@/auth";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";

export default async function Home() {
  const session = await auth();

  const response = await fetch("https://api.coinbase.com/v2/exchange-rates", {
    next: { revalidate: 60 },
  });

  const json: { data: { currency: string; rates: { [key: string]: string } } } =
    await response.json();

  const data = Object.keys(json.data.rates).map((key) => ({
    symbol: key,
    price: json.data.rates[key],
  }));

  return (
    <main className="whitespace-pre py-16 container">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-8">
        All Cryptocurrencies
      </h1>

      <DataTable columns={columns} data={data} />
    </main>
  );
}
