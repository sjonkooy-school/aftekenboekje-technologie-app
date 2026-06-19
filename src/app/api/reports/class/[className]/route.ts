import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardData } from "@/lib/dashboard-data";
import { demoLoginBypass } from "@/lib/demo-auth";

export const runtime = "nodejs";

async function createClassPdf(className: string) {
  const data = await getDashboardData();
  const students = data.students.filter((student) => student.className === className);

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const doc = new PDFDocument({ margin: 48, size: "A4" });

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(22).text(`Klasexport tech folio - ${className}`);
    doc.moveDown();
    doc.fontSize(11).text(`Gemaakt op: ${new Date().toLocaleDateString("nl-NL")}`);
    doc.text(`Aantal leerlingen: ${students.length}`);
    doc.moveDown();

    for (const student of students) {
      doc.fontSize(13).text(student.name);
      doc.fontSize(10).fillColor("#55615b").text(`${student.email} · ${student.completed} afgevinkt`);
      doc.fillColor("#000000").moveDown(0.5);
    }

    doc.moveDown();
    doc.fontSize(10).fillColor("#55615b").text("Deze export is bedoeld voor beheer en klassendossiers.");
    doc.end();
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ className: string }> }
) {
  const session = await auth();
  const role = session?.user.role;

  if (!demoLoginBypass && (!session?.user || role !== "ADMIN")) {
    return NextResponse.json({ error: "Alleen beheerders kunnen per klas exporteren" }, { status: 403 });
  }

  const { className } = await params;
  const pdf = await createClassPdf(decodeURIComponent(className));

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="tech-folio-klas-${className}.pdf"`
    }
  });
}
