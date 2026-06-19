# Aftekenboekje Technologie App

Web-app voor het digitale aftekenboekje Technologie met Microsoft-login, rollen, zelf-aftekenen door leerlingen en PDF-rapporten.

## Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- Microsoft Entra ID

## Rollen

- `STUDENT`: eigen voortgang bekijken, zelf doelen afvinken en eigen tech folio-PDF maken.
- `TEACHER`: leerlingen bekijken en rapporten maken.
- `ADMIN`: alle data beheren en alle PDF-exports maken.

## Installatie op Windows

Installeer eerst:

1. Node.js LTS
2. Git
3. PostgreSQL
4. Visual Studio Code

Sluit daarna PowerShell en open een nieuw venster, zodat `node` en `npm` in PATH staan.

Maak daarna een database aan, bijvoorbeeld:

```powershell
createdb aftekenboekje
```

Kopieer `.env.example` naar `.env` en vul de waarden in:

```env
DATABASE_URL="postgresql://postgres:wachtwoord@localhost:5432/aftekenboekje"
AUTH_SECRET="maak-hier-een-lange-willekeurige-secret-van"
AUTH_TRUST_HOST=true
AUTH_MICROSOFT_ENTRA_ID_ID="client-id"
AUTH_MICROSOFT_ENTRA_ID_SECRET="client-secret"
AUTH_MICROSOFT_ENTRA_ID_ISSUER="https://login.microsoftonline.com/tenant-id/v2.0/"
```

Installeer dependencies:

```powershell
npm install
```

Maak de database-tabellen:

```powershell
npx prisma migrate dev --name init
```

Vul de standaard Technologie-onderdelen:

```powershell
npm run db:seed
```

Start lokaal:

```powershell
npm run dev
```

Open daarna:

```text
http://localhost:3000
```

## Zonder ICT gebruiken

De app ondersteunt toegangscodes, zodat je niet afhankelijk bent van Microsoft Entra ID.

Standaard lokaal:

```env
ACCESS_CODE_LOGIN=true
STUDENT_ACCESS_CODE="leerling-demo"
TEACHER_ACCESS_CODE="docent-demo"
ADMIN_ACCESS_CODE="beheer-demo"
DEMO_LOGIN_BYPASS=false
```

Zie [DEPLOYMENT.md](./DEPLOYMENT.md) om de app zelf online te zetten met Vercel en Supabase.

## Microsoft Entra ID

Maak in Microsoft Entra ID een App Registration aan en zet deze redirect URL:

```text
http://localhost:3000/api/auth/callback/microsoft-entra-id
```

De waarden `client-id`, `client-secret` en de issuer met je tenant-id komen in `.env`.

## Huidige status

Deze eerste versie bevat:

- projectstructuur
- Prisma datamodel
- seed voor de Technologie-onderdelen
- Microsoft-login basis
- Nederlandse schermen voor leerling, docent en beheerder
- PDF-route voor tech folio-rapporten

De app toont voorbeelddata wanneer PostgreSQL nog niet is ingesteld.
