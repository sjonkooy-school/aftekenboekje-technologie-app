# Zelf online zetten zonder ICT

Deze route gebruikt:

- GitHub voor de code
- Vercel voor hosting
- Supabase voor PostgreSQL
- Toegangscodes in plaats van Microsoft-login

## 1. Supabase database maken

1. Ga naar `https://supabase.com`.
2. Maak een gratis project.
3. Open `Project Settings` > `Database`.
4. Kopieer de connection string voor PostgreSQL.
5. Gebruik die als `DATABASE_URL`.

Let op: gebruik de pooled connection string als Supabase die aanbiedt voor serverless/Vercel.

## 2. GitHub repository maken

1. Maak een nieuwe repository op GitHub.
2. Zet deze projectmap daarin.
3. Push de code naar GitHub.

## 3. Vercel project maken

1. Ga naar `https://vercel.com`.
2. Kies `Add New Project`.
3. Koppel je GitHub repository.
4. Framework preset: `Next.js`.
5. Voeg environment variables toe.

## 4. Environment variables in Vercel

Zet minimaal:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="lange-willekeurige-secret"
AUTH_TRUST_HOST=true
ACCESS_CODE_LOGIN=true
STUDENT_ACCESS_CODE="eigen-leerlingcode"
TEACHER_ACCESS_CODE="eigen-docentcode"
ADMIN_ACCESS_CODE="eigen-beheercode"
DEMO_LOGIN_BYPASS=false
```

Voor `AUTH_SECRET` kun je lokaal maken:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

## 5. Database vullen

Na deploy moet Prisma migreren en de standaard onderdelen vullen. Lokaal kan dat met:

```powershell
npx prisma migrate deploy
npm run db:seed
```

Voor Vercel/Supabase is het handig dit eerst vanaf je eigen computer te doen met dezelfde `DATABASE_URL`.

## 6. Later Microsoft-login toevoegen

Als ICT later meewerkt, voeg je deze waarden toe:

```env
AUTH_MICROSOFT_ENTRA_ID_ID="client-id"
AUTH_MICROSOFT_ENTRA_ID_SECRET="client-secret"
AUTH_MICROSOFT_ENTRA_ID_ISSUER="https://login.microsoftonline.com/tenant-id/v2.0/"
```

Dan kan Microsoft-login naast toegangscodes bestaan.
