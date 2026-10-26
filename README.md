# Voting Platform

> Create polls, share a link, and let people vote.  
> [Live Demo](https://voting-platform-nprt.onrender.com/login) · [GitHub Repository](https://github.com/Xenopus19/voting-platform)

## Preview

![Voting Platform screenshot](https://pub-60cd64ced4114249a48748e7d8de4393.r2.dev/vote-demo.png)

## Features

* **Accounts:** Register and log in with a username and password.
* **Poll creation:** Create a poll with a title, an expiration date, and multiple options.
* **Shareable polls:** Share a poll link so others can vote.
* **Vote tracking:** Prevent repeat votes using a browser fingerprint and show poll results as a chart.
* **Poll management:** View your polls and delete polls you created.
* **Responsive interface:** React-based UI styled with Tailwind CSS and shadcn/ui components.

## Tech Stack

**Client:** React, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, Recharts  
**Server:** Node.js, TypeScript, Express  
**Database:** PostgreSQL, Sequelize, Umzug migrations  
**Authentication:** JSON Web Tokens, bcrypt  
**Other:** FingerprintJS, Zod, GitHub Actions, Render

## Environment Variables

Create a `.env` file in the repository root for the backend:

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret used to sign and verify authentication tokens. Use a strong, private value. |
| `PORT` | No | Backend port; defaults to `3001` |

The frontend reads `VITE_API_BASE_URL` when Vite runs or builds. Set it in `client/.env.local` for local development:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

Vite embeds `VITE_*` values into the client bundle, so do not put secrets in them. In production, set `VITE_API_BASE_URL` to the deployed API URL ending in `/api`.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A running PostgreSQL database

### Setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Xenopus19/voting-platform.git
   cd voting-platform
   ```

2. Install dependencies for the server and client:

   ```bash
   npm run install:all
   ```

3. Create a `.env` file in the repository root:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/voting_platform
   JWT_SECRET=replace-with-a-long-random-secret
   PORT=3001
   ```

   Update `DATABASE_URL` to match your PostgreSQL database credentials and database name.

4. Configure the client in `client/.env.local`:

   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

The server runs database migrations automatically when it starts.

### Run Locally

Start the server and client together:

```bash
npm run dev
```

Or start them separately in two terminals:

```bash
# Terminal 1: API server at http://localhost:3001
npm run dev:server

# Terminal 2: Vite development server (typically http://localhost:5173)
npm run dev:client
```

### Build

Build the server and client:

```bash
npm run build
```

Run the built server with:

```bash
npm start
```
