"use client";

import { Button } from "@/components/ui/button";
import { Github, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function SignInButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit() {
    setIsPending(true);
    await signIn("github").catch(() => setIsPending(false));
  }

  return (
    <Button disabled={isPending} onClick={handleSubmit}>
      {isPending ? (
        <Loader className="mr-2 size-4 animate-spin" />
      ) : (
        <Github className="mr-2 size-4" />
      )}
      <span>Continue with GitHub</span>
    </Button>
  );
}
