"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ModuleIcon } from "@/components/ModuleIcon";

type Task = {
  id: string;
  title: string;
  category?: string;
  order: number;
};

type ModuleItem = {
  id: string;
  title: string;
  description: string;
  assignmentCount: number;
  tasks: Task[];
};

type CheckedState = Record<string, boolean>;

export function StudentChecklist({ modules }: { modules: ModuleItem[] }) {
  const totalTaskCount = modules.reduce((sum, module) => sum + module.tasks.length, 0);

  return (
    <div className="grid">
      <section className="tech-summary">
        <div>
          <span className="eyebrow">Leerlingweergave</span>
          <h2>Mijn tech folio</h2>
          <p>Kies een app om je opdrachten te bekijken. Er staan {totalTaskCount} doelen klaar.</p>
        </div>
        <Link className="button" href="/api/reports/student/demo?scope=total">
          Totaal PDF
        </Link>
      </section>

      <section className="app-grid">
        {modules.map((module) => (
          <Link className="app-tile" href={`/mijn-voortgang/${module.id}`} key={module.id}>
            <ModuleIcon title={module.title} />
            <strong>{module.title}</strong>
            <span>{module.assignmentCount} doelen</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export function StudentModuleChecklist({ module }: { module: ModuleItem }) {
  const [checked, setChecked] = useState<CheckedState>({});

  useEffect(() => {
    const saved = window.localStorage.getItem("techfolio-demo-progress");
    if (saved) {
      setChecked(JSON.parse(saved) as CheckedState);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("techfolio-demo-progress", JSON.stringify(checked));
  }, [checked]);

  const completed = useMemo(() => module.tasks.filter((task) => checked[task.id]).length, [checked, module.tasks]);

  function toggle(taskId: string) {
    setChecked((current) => ({
      ...current,
      [taskId]: !current[taskId]
    }));
  }

  return (
    <div className="grid">
      <section className="tech-summary">
        <div>
          <span className="eyebrow">Zelf aftekenen</span>
          <h2>{module.title}</h2>
          <p>
            {completed} van {module.tasks.length} doelen afgevinkt. Vink aan wat je hebt behaald.
          </p>
        </div>
        <Link className="button" href={`/api/reports/student/demo?module=${module.id}`}>
          Onderdeel PDF
        </Link>
      </section>

      <section className="module-stack">
        <article className="tech-card">
          <div className="module-head">
            <div>
              <span className="eyebrow">Opdrachtenoverzicht</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </div>
            <div className="module-actions">
              <span className="status">
                {completed}/{module.tasks.length}
              </span>
              <Link className="ghost-button" href="/mijn-voortgang">
                Terug
              </Link>
            </div>
          </div>

          <div className="task-grid">
            {module.tasks.map((task) => (
              <label className="task-row" key={task.id}>
                <input checked={Boolean(checked[task.id])} onChange={() => toggle(task.id)} type="checkbox" />
                <span>
                  {task.category ? <small>{task.category}</small> : null}
                  {task.title}
                </span>
              </label>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
