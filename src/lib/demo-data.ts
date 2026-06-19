import { moduleCatalog } from "@/lib/modules";

export const demoStudents = [
  {
    id: "demo-student-1",
    name: "Noor Jansen",
    email: "noor.jansen@school.nl",
    className: "T2A",
    completed: 37
  },
  {
    id: "demo-student-2",
    name: "Milan de Vries",
    email: "milan.devries@school.nl",
    className: "T2B",
    completed: 22
  },
  {
    id: "demo-student-3",
    name: "Sara Bakker",
    email: "sara.bakker@school.nl",
    className: "T3A",
    completed: 61
  }
];

export const demoModules = moduleCatalog.map((module, index) => ({
  id: `demo-module-${index + 1}`,
  title: module.title,
  description: module.description,
  order: index + 1,
  assignmentCount: module.tasks.length,
  completedCount: Math.min(module.tasks.length, Math.max(0, Math.round(module.tasks.length * ((index % 5) + 1) / 6))),
  tasks: module.tasks.map((task, taskIndex) => ({
    id: `demo-module-${index + 1}-task-${taskIndex + 1}`,
    title: task.title,
    category: task.category,
    order: taskIndex + 1
  }))
}));
