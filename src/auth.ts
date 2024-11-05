import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";

import { db, users } from "@/db";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: {
      role: string | null;
    } & DefaultSession["user"];
  }
}

export const config = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session }) {
      const [user] = await db
        .select({ role: users.role })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

      session.user.role = user.role;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
