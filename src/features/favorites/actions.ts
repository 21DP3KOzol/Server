"use server";

import { auth } from "@/auth";
import { db, favorites } from "@/db";
import { and, eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleFavorite(symbol: string) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("api/auth/signin");
  }

  const [{ count: result }] = await db
    .select({ count: count() })
    .from(favorites)
    .where(
      and(eq(favorites.userId, session.user.id), eq(favorites.symbol, symbol)),
    );

  if (result > 0) {
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, session.user.id),
          eq(favorites.symbol, symbol),
        ),
      );
  } else {
    await db.insert(favorites).values({ userId: session.user.id, symbol });
  }

  revalidatePath("/favorites");
}

export async function getFavorites() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("api/auth/signin");
  }

  const symbols = await db
    .select({ symbol: favorites.symbol })
    .from(favorites)
    .where(eq(favorites.userId, session.user.id));

  const response = await fetch("https://api.coinbase.com/v2/exchange-rates", {
    next: { revalidate: 60 },
  });

  const json: {
    data: { currency: string; rates: { [key: string]: string } };
  } = await response.json();

  return symbols.map(({ symbol }) => ({
    symbol,
    price: json.data.rates[symbol] || "N/A",
  }));
}
