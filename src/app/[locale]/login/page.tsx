"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Невірний телефон або пароль");
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl border border-border shadow-sm">
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Вхід в акаунт
        </h1>

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-xl mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Номер телефону
            </label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 (XX) XXX-XX-XX"
              className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Пароль
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-full h-12 text-lg mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Завантаження..." : "Увійти"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Ще немає акаунту?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}
