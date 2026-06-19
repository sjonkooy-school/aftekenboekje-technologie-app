import Link from "next/link";
import { RoleGate } from "@/components/RoleGate";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function StudentsPage() {
  const data = await getDashboardData();

  return (
    <RoleGate allow={["TEACHER", "ADMIN"]}>
      <main className="main">
        <section className="hero">
          <h1>Leerlingen</h1>
          <p>Bekijk wat leerlingen zelf hebben afgevinkt en open hun tech folio-overzicht.</p>
        </section>

        <section className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Naam</th>
                <th>Klas</th>
                <th>E-mail</th>
                <th>Aftekeningen</th>
                <th>Actie</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.email}</td>
                  <td>{student.completed}</td>
                  <td>
                    <Link className="ghost-button" href={`/leerlingen/${student.id}`}>
                      Openen
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </RoleGate>
  );
}
