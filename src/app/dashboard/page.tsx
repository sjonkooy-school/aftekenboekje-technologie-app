import Link from "next/link";
import { auth } from "@/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { demoLoginBypass, demoUser } from "@/lib/demo-auth";

export default async function DashboardPage() {
  const session = await auth();
  const data = await getDashboardData();
  const role = session?.user.role ?? (demoLoginBypass ? demoUser.role : "STUDENT");

  return (
    <main className="main">
      <section className="hero">
        <h1>Welkom bij het digitale aftekenboekje.</h1>
        <p>
          Volg de voortgang per leerling, teken opdrachten af en maak PDF-rapporten voor het tech folio.
          {data.source === "demo" ? " De app toont nu voorbeelddata totdat PostgreSQL is ingesteld." : ""}
        </p>
      </section>

      <section className="grid cols-3">
        <article className="card metric">
          <span className="muted">Onderdelen</span>
          <strong>{data.moduleCount}</strong>
        </article>
        <article className="card metric">
          <span className="muted">Leerlingen</span>
          <strong>{data.studentCount}</strong>
        </article>
        <article className="card metric">
          <span className="muted">Aftekeningen</span>
          <strong>{data.completedProgress}</strong>
        </article>
      </section>

      <section className="grid cols-2" style={{ marginTop: 16 }}>
        <article className="card">
          <h2>Snelle acties</h2>
          <div className="grid">
            <Link className="button" href="/mijn-voortgang">
              Mijn voortgang bekijken
            </Link>
            {role !== "STUDENT" ? (
              <Link className="ghost-button" href="/leerlingen">
                Leerlingvoortgang bekijken
              </Link>
            ) : null}
            {role === "ADMIN" ? (
              <Link className="ghost-button" href="/rapporten">
                Klassen exporteren
              </Link>
            ) : null}
          </div>
        </article>
        <article className="card">
          <h2>Toegangsrol</h2>
          <p className="muted">
            Je bent ingelogd als {role}. Rollen bepalen welke PDF’s en leerlinggegevens zichtbaar zijn.
          </p>
        </article>
      </section>
    </main>
  );
}
