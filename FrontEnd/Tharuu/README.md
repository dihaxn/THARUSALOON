# Tharu Frontend

This React + Vite app now ships with Tailwind CSS for utility-first styling.

## Getting started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the dev server:
   ```powershell
   npm run dev
   ```
3. Build for production:
   ```powershell
   npm run build
   ```

### Connect to the Spring Boot API

The bookings dashboard now pulls live data from the Spring Boot backend. Make sure the API is running before visiting the **Bookings** page.

1. Copy the example environment file and update the base URL if needed:
   ```powershell
   Copy-Item .env.example .env
   ```
2. Ensure the backend is running (default: `http://localhost:8080`). See `BackEnd/spring-boot/README.md` for setup steps.

## Tailwind CSS usage

- Tailwind is configured through `tailwind.config.cjs` with content paths covering `src/`, `components/`, and `pages/`.
- Global Tailwind layers are imported via `src/index.css`, which is already included in `src/main.jsx`.
- You can add on-demand utilities directly in JSX (e.g. `className="max-w-4xl mx-auto"`).
- If you need custom themes or safelisted classes, adjust the `safelist` or `theme.extend` sections inside `tailwind.config.cjs`.

## Linting

```powershell
npm run lint
```
