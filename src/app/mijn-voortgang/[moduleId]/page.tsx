import { notFound } from "next/navigation";
import { StudentModuleChecklist } from "@/components/StudentChecklist";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function MyModuleProgressPage({
  params
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const data = await getDashboardData();
  const module = data.modules.find((item) => item.id === moduleId);

  if (!module) {
    notFound();
  }

  return (
    <main className="main">
      <StudentModuleChecklist module={module} />
    </main>
  );
}
