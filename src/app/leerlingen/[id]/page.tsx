import Link from "next/link";
import { RoleGate } from "@/components/RoleGate";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function StudentDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDashboardData();
  const student = data.students.find((item) => item.id === id) ?? data.students[0];

  return (
    <RoleGate allow={["TEACHER", "ADMIN"]}>
      <main className="main">
        <section className="hero">
          <span className="eyebrow">Voortgang bekijken</span>
          <h1>{student.name}</h1>
          <p>
            {student.className} · {student.email}. Leerlingen tekenen zelf af; beheer en docenten kijken mee.
          </p>
        </section>

        <section className="grid cols-2">
          <article className="tech-card">
            <h2>Tech folio</h2>
            <p className="muted">
              Deze leerling heeft in de demodata {student.completed} onderdelen afgevinkt. In de echte database wordt dit
              gevuld met de zelf-aftekeningen van de leerling.
            </p>
            <Link className="button" href={`/api/reports/student/${student.id}?scope=total`}>
              Totaal PDF maken
            </Link>
          </article>

          <article className="tech-card">
            <h2>Leerlingkant bekijken</h2>
            <p className="muted">
              Open de leerlingweergave om precies te zien welke checklists en PDF-knoppen leerlingen gebruiken.
            </p>
            <Link className="ghost-button" href="/mijn-voortgang">
              Open leerlingweergave
            </Link>
          </article>
        </section>

        <section className="module-stack" style={{ marginTop: 16 }}>
          {data.modules.map((module) => (
            <article className="tech-card" key={module.id}>
              <div className="module-head">
                <div>
                  <span className="eyebrow">{module.tasks.length} doelen</span>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                </div>
                <Link className="ghost-button" href={`/api/reports/student/${student.id}?module=${module.id}`}>
                  Onderdeel PDF
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </RoleGate>
  );
}
