# Webshop (React + Vite + MUI)

Live demo: https://mark-webshop.web.app

Frontend React bootcamp webshop project demonstrating a small e-commerce UI with authentication, admin pages, and common integrations. The corresponding backend repository is here: https://github.com/hallapmark/webshop-backend

Quick highlights
- Tech: React 19, Vite, React Router, MUI, React Context, TypeScript (some .jsx files), i18n, Leaflet (maps), react-toastify. See `package.json` and `src/App.tsx`.
- Important features: JWT auth and protected routes, admin area with CRUD pages, shopping cart with persistence (localStorage), internationalization, map integration on shop pages, and role-based route guards.
- `/admin` is a role-based route and contains the admin CRUD
pages.
- `/cart` shows cart persistence and checkout UI.
- `/shops` shows the integrated map.

Run locally
1. Clone this repo and the backend: the backend repo has instructions for starting the API.
2. Create a `.env.dev.local` (or similar) and set the API base URL using the variable below, then install and run the frontend:

```bash
cp .env.example .env.dev.local
# edit .env.dev.local and set VITE_BACKEND_URL
npm install
npm run dev
# open the app in your browser (Vite usually serves on http://localhost:5173)
```

Environment
- See `.env.example` for the single required variable: `VITE_BACKEND_URL`.
