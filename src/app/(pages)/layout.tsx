import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <header>
        <div className="container py-2 grid grid-cols-[1fr,_max-content,_1fr]">
          <div className="flex items-center">
            <Link href="/" className="font-medium">
              CryptoBuddha
            </Link>
          </div>

          <nav>
            <ul className="flex gap-2">
              <li>
                <Link
                  href="favorites"
                  className={buttonVariants({ variant: "link" })}
                >
                  Favorites
                </Link>
              </li>

              {session?.user?.role === "admin" && (
                <li>
                  <Link
                    href="admin"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            {session ? (
              <>
                <div>
                  <p>{session?.user?.name}</p>

                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button
                      type="submit"
                      className="text-sm text-muted-foreground flex gap-2 w-full"
                    >
                      <LogOut className="size-4" />
                      <span>Sign Out</span>
                    </button>
                  </form>
                </div>

                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ""} />

                  <AvatarFallback>
                    {session?.user?.name?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className={buttonVariants({ variant: "ghost" })}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
