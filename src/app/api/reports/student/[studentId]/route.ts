import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { demoLoginBypass } from "@/lib/demo-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

async function createPdfBuffer(studentId: string, moduleId?: string | null) {
  const data = await getDashboardData();
  const student = data.students.find((item) => item.id === studentId) ?? data.students[0];
  const modules = moduleId ? data.modules.filter((module) => module.id === moduleId) : data.modules;

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({ margin: 48, size: "A4" });

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(22).text(moduleId ? "Tech folio onderdeelrapport" : "Tech folio totaalrapport", {
      align: "left"
    });
    doc.moveDown();
    doc.fontSize(12).text(`Leerling: ${student.name}`);
    doc.text(`Klas: ${student.className}`);
    doc.text(`E-mail: ${student.email}`);
    doc.text(`Gemaakt op: ${new Date().toLocaleDateString("nl-NL")}`);
    doc.moveDown();

    doc.fontSize(16).text("Onderdelen", { underline: true });
    doc.moveDown(0.5);

    for (const module of modules) {
      doc.fontSize(12).text(`${module.order}. ${module.title}`);
      doc.fontSize(10).fillColor("#55615b").text(module.description);
      doc.fillColor("#000000").moveDown(0.2);

      for (const task of module.tasks) {
        const prefix = task.category ? `${task.category}: ` : "";
        doc.fontSize(9).text(`- ${prefix}${task.title}`);
      }

      doc.moveDown(0.7);
    }

    doc.moveDown();
    doc.fontSize(10).fillColor("#55615b").text(
      "Dit rapport is gegenereerd door het digitale aftekenboekje Technologie voor het tech folio."
    );
    doc.end();
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const session = await auth();

  if (!session?.user && !demoLoginBypass) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const { studentId } = await params;
  const url = new URL(request.url);
  const moduleId = url.searchParams.get("module");
  const isPrivileged = session?.user.role === "TEACHER" || session?.user.role === "ADMIN" || demoLoginBypass;
  const isDemoSelfReport = studentId === "demo";
  const isOwnStudentProfile = await prisma.studentProfile
    .findFirst({
      where: {
        id: studentId,
        userId: session?.user.id ?? ""
      },
      select: { id: true }
    })
    .then(Boolean)
    .catch(() => false);

  if (!isPrivileged && !isDemoSelfReport && !isOwnStudentProfile) {
    return NextResponse.json({ error: "Geen toegang tot dit rapport" }, { status: 403 });
  }

  const pdf = await createPdfBuffer(studentId, moduleId);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="technologie-rapport-${studentId}.pdf"`
    }
  });
}
