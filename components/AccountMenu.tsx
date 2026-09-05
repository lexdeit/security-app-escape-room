"use client";

import { useRouter } from "next/navigation";
import { UserMenu } from "./ui";

export function AccountMenu({ name, email }: { name: string; email: string }) {
  const router = useRouter();
  return (
    <UserMenu
      name={name}
      email={email}
      onProfile={() => router.push("/profile")}
      onSignOut={async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } finally {
          window.location.href = "/login";
        }
      }}
    />
  );
}
