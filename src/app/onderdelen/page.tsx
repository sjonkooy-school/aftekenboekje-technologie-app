import { getDashboardData } from "@/lib/dashboard-data";

export default async function ModulesPage() {
  const data = await getDashboardData();

  return (
    <main className="main">
      <section className="hero">
        <h1>Onderdelen</h1>
        <p>Alle onderdelen uit het aftekenboekje staan klaar met de doelen die leerlingen zelf kunnen afvinken.</p>
      </section>

      <section className="module-stack">
        {data.modules.map((module) => (
          <article className="tech-card" key={module.id}>
            <div className="module-head">
              <div>
                <span className="eyebrow">Onderdeel {module.order}</span>
                <h2>{module.title}</h2>
                <p>{module.description}</p>
              </div>
              <span className="status">{module.assignmentCount} doelen</span>
            </div>
            <div className="task-grid compact">
              {module.tasks.map((task) => (
                <div className="task-row readonly" key={task.id}>
                  <span>
                    {task.category ? <small>{task.category}</small> : null}
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
