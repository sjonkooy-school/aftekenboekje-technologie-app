import Link from "next/link";
import { RoleGate } from "@/components/RoleGate";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function ReportsPage() {
  const data = await getDashboardData();
  const classes = Array.from(new Set(data.students.map((student) => student.className))).sort();

  return (
    <RoleGate allow={["TEACHER", "ADMIN"]}>
      <main className="main">
        <section className="hero">
          <span className="eyebrow">Exportcentrum</span>
          <h1>Rapporten</h1>
          <p>
            Maak PDF’s voor één leerling, één onderdeel of een hele klas. Per-klas export is bedoeld voor beheerders.
          </p>
        </section>

        <section className="grid cols-2">
          <article className="tech-card">
            <h2>Export per klas</h2>
            <div className="grid">
              {classes.map((className) => (
                <div className="export-row" key={className}>
                  <span>{className}</span>
                  <Link className="ghost-button" href={`/api/reports/class/${encodeURIComponent(className)}`}>
                    Klas PDF
                  </Link>
                </div>
              ))}
            </div>
          </article>

          <article className="tech-card">
            <h2>Leerlingrapporten</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Leerling</th>
                  <th>Klas</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {data.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.className}</td>
                    <td>
                      <Link className="ghost-button" href={`/api/reports/student/${student.id}?scope=total`}>
                        Totaal
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </main>
    </RoleGate>
  );
}
