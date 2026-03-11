## Dev DC Portfolio

Personal full‑stack developer portfolio built with a production‑style Next.js App Router setup, an internal dashboard and architecture‑focused project cards.

### Main features

- **Public landing** with sections for hero, skills, career timeline and projects.
- **Architecture view per project** – each project card exposes its frontend, backend, data sources and hosting.
- **Internal dashboard (`/dc-dashboard`)** for managing hero variants, translations and assets instead of hard‑coded content.
- **Internationalization (EN/UA)** powered by dictionary files and typed language codes.
- **Light / dark / system theme switcher** and responsive layout from mobile to desktop.
- **Scroll‑driven UI** – sticky project cards, scroll‑to‑top button, subtle decorative backgrounds to showcase layout/CSS skills.

### Tech stack

- **Framework**: Next.js (App Router, TypeScript, React 19)
- **Styling**: Tailwind CSS, custom CSS utilities, responsive layout
- **Auth**: Auth0 (`@auth0/nextjs-auth0`) with middleware protection
- **Database / ORM**: PostgreSQL + Prisma
- **Storage / CDN**: Supabase (object storage for images)
- **Forms & validation**: React Hook Form, Yup
- **i18n**: `next-intl` + JSON dictionaries (`src/dictionaries/en.json`, `ua.json`)
- **UI/UX**: Headless UI, custom components, Storybook for isolated UI development
- **Tooling**: ESLint 9, Prettier, Husky + lint‑staged, TypeScript 5

### Project scripts

- **Development**

  ```bash
  npm run dev
  ```

  Runs the Next.js dev server on `http://localhost:3001`.

- **Lint & formatting**

  ```bash
  npm run lint      # ESLint with --fix
  npm run format    # Prettier over src/**/*.{js,jsx,ts,tsx}
  npm run precheck  # lint + format
  ```

- **Database & build**

  ```bash
  npm run build     # prisma generate && next build
  npm start         # next start (after a successful build)
  ```

- **Storybook**

  ```bash
  npm run storybook        # Storybook dev server (port 6006)
  npm run build-storybook  # Static Storybook build
  ```

### Environment configuration

Create a `.env.local` file in the project root. At minimum you will need:

- **Database**
  - `DATABASE_URL` – PostgreSQL connection string (used by Prisma).
- **Supabase storage**
  - `SUPABASE_PROJECT_URL` – Supabase project URL.
  - `SUPABASE_ANON_API_KEY` – public anon key.
  - `SUPABASE_STORAGE_BUCKET_NAME` – bucket for images.
  - `SUPABASE_STORAGE_FOLDER_NAME` – folder within the bucket.
  - `SUPABASE_STORAGE_FILE_PATH_PREFIX` – optional prefix for stored files.
- **Auth0**
  - Auth0 environment variables as required by `@auth0/nextjs-auth0`  
    (domain, client ID/secret, base URL, secret, etc. – follow the library’s official setup guide).

Do **not** commit `.env.local` to version control.

### Local development workflow

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure `.env.local` with database, Supabase and Auth0 credentials.
3. Apply Prisma migrations and generate the client (if needed):

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Optionally, run Storybook in parallel to work on UI components:

   ```bash
   npm run storybook
   ```

### Deployment

The project is optimised for deployment on **Vercel**:

- Vercel will run `npm run build`, which in turn runs `prisma generate && next build`.
- Ensure all required environment variables (database, Supabase, Auth0) are configured in the Vercel project settings.
- Use a managed PostgreSQL instance (e.g. Supabase, Railway, Neon) for `DATABASE_URL`.

For more details see the official Next.js deployment docs (`app` router) and the Prisma + Vercel deployment guides.
