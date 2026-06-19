import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const microsoftClientId = process.env.AUTH_MICROSOFT_ENTRA_ID_ID;
const microsoftClientSecret = process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET;
const microsoftIssuer = process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER;

const microsoftConfigured =
  Boolean(microsoftClientId) &&
  microsoftClientId !== "client-id" &&
  Boolean(microsoftClientSecret) &&
  microsoftClientSecret !== "client-secret" &&
  Boolean(microsoftIssuer) &&
  !microsoftIssuer?.includes("tenant-id");

const accessCodeEnabled = process.env.ACCESS_CODE_LOGIN !== "false";

function codeRole(accessCode?: string) {
  const code = accessCode?.trim();

  if (!code) {
    return null;
  }

  if (code === process.env.ADMIN_ACCESS_CODE) {
    return "ADMIN" as const;
  }

  if (code === process.env.TEACHER_ACCESS_CODE) {
    return "TEACHER" as const;
  }

  if (code === process.env.STUDENT_ACCESS_CODE) {
    return "STUDENT" as const;
  }

  return null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    ...(accessCodeEnabled
      ? [
          Credentials({
            name: "Toegangscode",
            credentials: {
              name: { label: "Naam", type: "text" },
              accessCode: { label: "Toegangscode", type: "password" }
            },
            async authorize(credentials) {
              const role = codeRole(credentials?.accessCode as string | undefined);
              const name = String(credentials?.name ?? "").trim();

              if (!role) {
                return null;
              }

              return {
                id: `code-${role.toLowerCase()}`,
                name: name || (role === "ADMIN" ? "Beheerder" : role === "TEACHER" ? "Docent" : "Leerling"),
                email: `${role.toLowerCase()}@techfolio.local`,
                role
              };
            }
          })
        ]
      : []),
    ...(microsoftConfigured
      ? [
          MicrosoftEntraID({
            clientId: microsoftClientId,
            clientSecret: microsoftClientSecret,
            issuer: microsoftIssuer
          })
        ]
      : [])
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "STUDENT";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role =
          token.role === "TEACHER" || token.role === "ADMIN" ? token.role : "STUDENT";
      }
      return session;
    }
  }
});
