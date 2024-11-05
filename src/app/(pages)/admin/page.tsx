import { auth } from "@/auth";
import { db, favorites } from "@/db";
import { count, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import Pie from "./pie";

export default async function Admin() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  const favorite = await db
    .select({ symbol: favorites.symbol, count: count() })
    .from(favorites)
    .groupBy(favorites.symbol)
    .orderBy(desc(count()));

  return (
    <main className="py-16 container">
      <div className="h-64 max-w-screen-sm mx-auto">
        <Pie
          data={favorite.map(({ symbol, count }) => ({
            value: count,
            label: symbol,
          }))}
        />
      </div>
    </main>
  );
}
