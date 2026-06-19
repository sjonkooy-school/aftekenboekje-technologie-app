import Link from "next/link";
import { auth } from "@/auth";
import { demoLoginBypass, demoUser } from "@/lib/demo-auth";

type Role = "STUDENT" | "TEACHER" | "ADMIN";

export async function RoleGate({
  allow,
  children
}: {
  allow: Role[];
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user ?? (demoLoginBypass ? demoUser : null);
  const role = user?.role ?? "STUDENT";

  if (!user) {
    return (
      <main className="main">
        <section className="card">
          <h1>Niet ingelogd</h1>
          <p className="muted">Log eerst in met je Microsoft schoolaccount.</p>
          <Link className="button" href="/login">
            Naar inloggen
          </Link>
        </section>
      </main>
    );
  }

  if (!allow.includes(role)) {
    return (
      <main className="main">
        <section className="card">
          <h1>Geen toegang</h1>
          <p className="muted">
            Je account heeft nu de rol {role}. Deze pagina is bedoeld voor {allow.join(", ")}.
          </p>
          <Link className="button" href="/dashboard">
            Terug naar dashboard
          </Link>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
