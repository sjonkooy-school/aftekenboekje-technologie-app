import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { demoLoginBypass, demoUser } from "@/lib/demo-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aftekenboekje Technologie",
  description: "Voortgang, zelf-aftekenen en tech folio-rapporten voor Technologie."
};

async function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button className="ghost-button" type="submit">
        Uitloggen
      </button>
    </form>
  );
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user ?? (demoLoginBypass ? demoUser : null);

  return (
    <html lang="nl">
      <body>
        <div className="shell">
          {user ? (
            <header className="topbar">
              <Link className="brand" href="/dashboard">
                <strong>Aftekenboekje Technologie</strong>
                <span>
                  {user.name ?? user.email} · {user.role}
                </span>
              </Link>
              <nav className="nav" aria-label="Hoofdnavigatie">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/mijn-voortgang">Mijn voortgang</Link>
                <Link href="/leerlingen">Leerlingen</Link>
                <Link href="/onderdelen">Onderdelen</Link>
                <Link href="/rapporten">Rapporten</Link>
                <Link href="/beheer">Beheer</Link>
              </nav>
              {session?.user ? (
                <SignOutButton />
              ) : (
                <Link className="ghost-button" href="/dashboard">
                  Demo modus
                </Link>
              )}
            </header>
          ) : null}
          {children}
        </div>
      </body>
    </html>
  );
}
