# OctoFit Frontend (React 19 + Vite)

The presentation tier uses `react-router-dom` and fetches API data from the backend service on port `8000`.

## Environment setup

Define `VITE_CODESPACE_NAME` so the frontend can call the Codespaces backend URL:

```bash
# octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
```

When defined, the app targets API endpoints in this format:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Examples:

- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

```text
http://localhost:8000/api
```

This prevents broken URLs such as `https://undefined-8000...`.

## Run locally

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
