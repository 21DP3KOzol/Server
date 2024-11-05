import { getFavorites } from "@/features/favorites/actions";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

export default async function Favorites() {
  const data = await getFavorites();

  return (
    <main className="py-16 container">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-8">
        Favorites
      </h1>

      <DataTable columns={columns} data={data} />
    </main>
  );
}
