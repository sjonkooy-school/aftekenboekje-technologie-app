import { StudentChecklist } from "@/components/StudentChecklist";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function MyProgressPage() {
  const data = await getDashboardData();

  return (
    <main className="main">
      <section className="hero">
        <span className="eyebrow">Wat leerlingen zien</span>
        <h1>Mijn voortgang</h1>
        <p>Vink zelf af wat je hebt behaald en maak een PDF per onderdeel of van je totale tech folio.</p>
      </section>

      <StudentChecklist modules={data.modules} />
    </main>
  );
}
