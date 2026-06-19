import { prisma } from "@/lib/prisma";
import { demoModules, demoStudents } from "@/lib/demo-data";

export async function getDashboardData() {
  try {
    const [modules, students, completedProgress] = await Promise.all([
      prisma.module.findMany({
        orderBy: { order: "asc" },
        include: {
          assignments: {
            orderBy: { order: "asc" }
          },
          _count: {
            select: {
              reports: true
            }
          }
        }
      }),
      prisma.studentProfile.findMany({
        include: {
          user: true,
          progress: {
            where: { status: "COMPLETED" }
          }
        },
        orderBy: [{ className: "asc" }, { user: { name: "asc" } }]
      }),
      prisma.progress.count({
        where: { status: "COMPLETED" }
      })
    ]);

    return {
      source: "database" as const,
      moduleCount: modules.length,
      studentCount: students.length,
      completedProgress,
      modules: modules.map((module) => ({
        id: module.id,
        title: module.title,
        description: module.description ?? "",
        order: module.order,
        assignmentCount: module.assignments.length,
        completedCount: 0,
        tasks: module.assignments.map((assignment) => ({
          id: assignment.id,
          title: assignment.title,
          category: undefined,
          order: assignment.order
        }))
      })),
      students: students.map((student) => ({
        id: student.id,
        name: student.user.name ?? "Onbekende leerling",
        email: student.user.email ?? "",
        className: student.className ?? "Geen klas",
        completed: student.progress.length
      }))
    };
  } catch {
    return {
      source: "demo" as const,
      moduleCount: demoModules.length,
      studentCount: demoStudents.length,
      completedProgress: demoStudents.reduce((sum, student) => sum + student.completed, 0),
      modules: demoModules,
      students: demoStudents
    };
  }
}
