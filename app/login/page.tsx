import LoginClient from "./LoginClient";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sign in — ACCENDO",
};

type SearchParams = Promise<{ redirect?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { redirect } = await searchParams;

  return (
    <main className="min-h-screen section-cream">
      <Navbar />
      <LoginClient redirectTo={redirect ?? "/admin"} />
    </main>
  );
}
