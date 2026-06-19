import { PrismaClient } from "@prisma/client";
import { moduleCatalog, slugifyModule } from "../src/lib/modules";

const prisma = new PrismaClient();

async function main() {
  for (const [index, module] of moduleCatalog.entries()) {
    const slug = slugifyModule(module.title);
    const existing = await prisma.module.findUnique({
      where: { slug },
      include: { assignments: true }
    });

    if (existing) {
      await prisma.module.update({
        where: { id: existing.id },
        data: {
          title: module.title,
          description: module.description,
          order: index + 1,
          isActive: true
        }
      });

      for (const [taskIndex, task] of module.tasks.entries()) {
        const title = task.category ? `${task.category}: ${task.title}` : task.title;
        const assignment = existing.assignments.find((item) => item.order === taskIndex + 1);

        if (assignment) {
          await prisma.assignment.update({
            where: { id: assignment.id },
            data: {
              title,
              description: "Leerling tekent dit zelf af zodra het onderdeel is behaald.",
              order: taskIndex + 1
            }
          });
        } else {
          await prisma.assignment.create({
            data: {
              moduleId: existing.id,
              title,
              description: "Leerling tekent dit zelf af zodra het onderdeel is behaald.",
              order: taskIndex + 1
            }
          });
        }
      }

      continue;
    }

    await prisma.module.upsert({
      where: { slug },
      update: {
        title: module.title,
        description: module.description,
        order: index + 1,
        isActive: true
      },
      create: {
        title: module.title,
        slug,
        description: module.description,
        order: index + 1,
        assignments: {
          create: module.tasks.map((task, taskIndex) => ({
            title: task.category ? `${task.category}: ${task.title}` : task.title,
            description: "Leerling tekent dit zelf af zodra het onderdeel is behaald.",
            order: taskIndex + 1
          }))
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
