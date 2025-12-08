"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" ,prompt: "select_account"})}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
