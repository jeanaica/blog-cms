# Blog CMS

Admin dashboard for managing blog posts and articles. Built with React, Vite, and Tailwind CSS, backed by a GraphQL API and Firebase.

## Requirements

- Node 24+ (see `.nvmrc`)
- npm
- Backend server — [cms-firestore-gql](../cms-firestore-gql)
- Firebase project

## Setup

1. Clone the project

2. Install dependencies

   ```
   npm install --legacy-peer-deps
   ```

3. Create `.env.local` with your environment variables

   ```
   VITE_API_URL=http://localhost:5001/<project-id>/<region>/graphql
   VITE_UPLOAD_URL=http://localhost:5001/<project-id>/<region>/uploadImage
   VITE_FIREBASE_PUBLIC_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=localhost
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_DOMAIN=http://localhost:3000
   VITE_APP_ENV=development
   ```

## Running locally with Firebase Emulators

1. Start the Firebase emulators in the backend project (`cms-firestore-gql`):

   ```
   npm run serve
   ```

2. Start the dev server:

   ```
   npm run dev
   ```

   The app runs at `http://localhost:5173` and connects to the emulated GraphQL API and Firebase Auth.

## Running against staging

1. Create `.env.staging` with your staging environment variables (same keys as above, with staging values).

2. Start the dev server in staging mode:

   ```
   npm run staging
   ```

## Building for production

```
npm run build
```

This runs `tsc && vite build` and outputs to `dist/`.

Preview the production build locally:

```
npm run preview
```

## Deployment

The project is deployed to Vercel. Pushes to `main` trigger a production deployment automatically.

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 24.x

Environment variables must be set in the Vercel dashboard with the `VITE_` prefix.
