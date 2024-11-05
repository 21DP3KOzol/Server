import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "./sign-in-button";

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-8">
        Sign In
      </h1>

      <div className="text-center">
        <SignInButton />
      </div>
    </main>
  );
}
