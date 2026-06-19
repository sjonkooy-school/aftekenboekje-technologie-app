import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { demoLoginBypass } from "@/lib/demo-auth";

export default async function LoginPage() {
  if (demoLoginBypass) {
    redirect("/dashboard");
  }

  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="login-page">
      <section className="card login-panel">
        <div className="hero">
          <h1>Inloggen</h1>
          <p>
            Gebruik een toegangscode om het aftekenboekje Technologie te openen. Leerlingen zien hun eigen tech folio;
            docenten en beheerders krijgen extra beheerfuncties.
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("credentials", { redirectTo: "/dashboard" });
          }}
        >
          <label className="form-row">
            Naam
            <input name="name" placeholder="Bijvoorbeeld Sjon Kooy" />
          </label>
          <label className="form-row">
            Toegangscode
            <input name="accessCode" placeholder="Vul je code in" type="password" />
          </label>
          <button className="button" type="submit">
            Inloggen
          </button>
        </form>
      </section>
    </main>
  );
}
