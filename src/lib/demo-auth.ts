export const demoLoginBypass = process.env.DEMO_LOGIN_BYPASS === "true";

export const demoUser = {
  id: "demo-admin",
  name: "Demo beheerder",
  email: "demo@school.nl",
  role: "ADMIN" as const
};
