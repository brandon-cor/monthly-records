import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/layout/navbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={{ name: session.user.name }} />
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
