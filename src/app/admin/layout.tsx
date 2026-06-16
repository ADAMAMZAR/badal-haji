import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/admin/SessionProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isLoginPage = pathname === "/admin/login";

  const session = await getServerSession(authOptions);
  if (!session && !isLoginPage) redirect("/admin/login");

  if (!session) return <>{children}</>;
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
