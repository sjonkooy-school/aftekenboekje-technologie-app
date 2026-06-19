import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { demoLoginBypass } from "@/lib/demo-auth";

export default async function HomePage() {
  if (demoLoginBypass) {
    redirect("/dashboard");
  }

  const session = await auth();
  redirect(session?.user ? "/dashboard" : "/login");
}
