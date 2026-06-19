import { RoleGate } from "@/components/RoleGate";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function AdminPage() {
  const data = await getDashboardData();

  return (
    <RoleGate allow={["ADMIN"]}>
      <main className="main">
        <section className="hero">
          <h1>Beheer</h1>
          <p>Beheer rollen, onderdelen en exports. Dit scherm is alleen toegankelijk voor beheerders.</p>
        </section>

        <section className="grid cols-3">
          <article className="card">
            <h2>Gebruikers</h2>
            <p className="muted">Koppel Microsoft-accounts aan leerling, docent of beheerder.</p>
          </article>
          <article className="card">
            <h2>Onderdelen</h2>
            <p className="muted">{data.moduleCount} Technologie-onderdelen actief.</p>
          </article>
          <article className="card">
            <h2>Exports</h2>
            <p className="muted">Download rapporten per leerling, klas, onderdeel of volledig archief.</p>
          </article>
        </section>
      </main>
    </RoleGate>
  );
}
