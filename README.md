```
░██████████                                                     ░██     ░██ ░█████████  ░██
    ░██                                                         ░██     ░██ ░██     ░██ ░██
    ░██     ░██████   ░██░████ ░█████████  ░██████   ░████████  ░██     ░██ ░██     ░██ ░██  ░███████
    ░██          ░██  ░███          ░███        ░██  ░██    ░██ ░██████████ ░█████████      ░██
    ░██     ░███████  ░██         ░███     ░███████  ░██    ░██ ░██     ░██ ░██   ░██        ░███████
    ░██    ░██   ░██  ░██       ░███      ░██   ░██  ░██    ░██ ░██     ░██ ░██    ░██             ░██
    ░██     ░█████░██ ░██      ░█████████  ░█████░██ ░██    ░██ ░██     ░██ ░██     ░██      ░███████



░███    ░██ ░██     ░██ ░██    ░██ ░██████████   ░██████████                                      ░██               ░██
░████   ░██ ░██     ░██  ░██  ░██      ░██           ░██                                          ░██               ░██
░██░██  ░██ ░██     ░██   ░██░██       ░██           ░██     ░███████  ░█████████████  ░████████  ░██  ░██████   ░████████  ░███████
░██ ░██ ░██ ░██     ░██    ░███        ░██           ░██    ░██    ░██ ░██   ░██   ░██ ░██    ░██ ░██       ░██     ░██    ░██    ░██
░██  ░██░██ ░██     ░██   ░██░██       ░██           ░██    ░█████████ ░██   ░██   ░██ ░██    ░██ ░██  ░███████     ░██    ░█████████
░██   ░████  ░██   ░██   ░██  ░██      ░██           ░██    ░██        ░██   ░██   ░██ ░███   ░██ ░██ ░██   ░██     ░██    ░██
░██    ░███   ░██████   ░██    ░██     ░██           ░██     ░███████  ░██   ░██   ░██ ░██░█████  ░██  ░█████░██     ░████  ░███████
                                                                                       ░██
                                                                                       ░██
```

https://nuit-info.tarzanhr.fr/

A production-ready **Nuxt 4** template with **i18n** support and optional **Prisma + MySQL** integration.

> **💡 Note:** This template includes database support by default, but you can easily remove it if you only need a simple website. See [Working Without a Database](#working-without-a-database) below.

## Tech Stack

-   **[Nuxt 4](https://nuxt.com)** - Full-stack Vue.js framework
-   **[Nuxt i18n](https://i18n.nuxtjs.org/)** - Internationalization (FR/EN)
-   **[Prisma](https://www.prisma.io/)** - ORM for MySQL _(optional)_
-   **[ESLint](https://eslint.org/)** - Linter with stylistic configuration
-   **[Husky](https://typicode.github.io/husky/)** - Git hooks for lint-staged
-   **[Docker](https://www.docker.com/)** - MySQL for local development _(optional)_
-   **[dotenv-cli](https://github.com/entropitor/dotenv-cli)** - Environment variable management

---

## Installation

### Prerequisites

-   Node.js (v18+)
-   Docker & Docker Compose (for local development only)

### Quick Start

```bash
# Install dependencies
npm install

# Run complete setup (Docker + Prisma + Seed)
npm run setup

# Start development server
npm run dev
```

The server will start on `http://localhost:3020` (configured via PORT in `.env`)

---

## Available Scripts

### Development

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build application for production |
| `npm run start`   | Start production server          |
| `npm run preview` | Preview production build         |

### Database (Prisma)

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run setup`           | Complete setup: Docker + Prisma + Seed              |
| `npm run db:generate`     | Generate Prisma client (uses .env)                  |
| `npm run db:migrate`      | Create and apply migration (dev, uses .env)         |
| `npm run db:migrate:prod` | Apply migrations (production, uses .env.production) |
| `npm run db:push`         | Push schema without creating migration (uses .env)  |
| `npm run db:seed`         | Insert test data (uses .env)                        |
| `npm run db:reset`        | Reset database + re-seed (uses .env)                |
| `npm run db:studio`       | Open Prisma Studio GUI (uses .env)                  |

> **Note:** All database commands use `dotenv-cli` with the `-o` flag to override system environment variables and ensure the correct database is used.

### Docker (Development only)

| Command               | Description           |
| --------------------- | --------------------- |
| `npm run docker:up`   | Start MySQL container |
| `npm run docker:down` | Stop MySQL container  |
| `npm run docker:logs` | Display MySQL logs    |

### Linting

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `npm run lint`     | Check code with ESLint          |
| `npm run lint:fix` | Automatically fix ESLint errors |

---

## Database Configuration

### Development (Local)

The template uses **Docker** for an isolated MySQL database. The `.env` file should contain:

```env
DATABASE_URL=mysql://nuxt_user:nuxt_password@localhost:3306/template_nuxt
NODE_ENV=development
PORT=3020
HOST=0.0.0.0
```

Benefits:

-   No MySQL installation required
-   Test data via `npm run db:seed`
-   Easy reset with `npm run db:reset`
-   Complete freedom to test without risk

### Production

Use your own server database by creating a `.env.production` file:

```env
DATABASE_URL=mysql://user:password@your-server.com:3306/your_database
NODE_ENV=production
PORT=3020
HOST=0.0.0.0
```

Deployment steps:

1. Create a MySQL database on your server
2. Create `.env.production` with your production credentials
3. Run `npm run db:migrate:prod` to apply migrations
4. **DO NOT run `npm run db:seed` in production**

> **Important:** All scripts use `dotenv-cli -o` to force the use of `.env` files over system environment variables. This ensures you always connect to the correct database.

### Working Without a Database

If you don't need a database for your project:

1. **Remove Prisma dependencies:**

    ```bash
    npm uninstall @prisma/client @prisma/nuxt prisma
    ```

2. **Remove Prisma from nuxt.config.ts:**

    ```ts
    // Remove this line:
    ...(process.env.NODE_ENV === 'production' ? [] : ['@prisma/nuxt']),

    // And remove this block:
    prisma: {
      autoSetupPrisma: false,
    },
    ```

3. **Delete Prisma files:**

    ```bash
    rm -rf prisma/ lib/prisma.ts prisma.config.ts
    ```

4. **Remove Docker (optional):**

    ```bash
    npm run docker:down
    rm docker-compose.yml
    ```

5. **Clean up package.json scripts** - Remove all `db:*` and `docker:*` scripts

Your template will now be a lightweight Nuxt 4 + i18n setup without database overhead! 🚀

---

## Internationalization (i18n)

The template supports French and English by default:

-   **Default language:** French (`fr`)
-   **Available languages:** `en`, `fr`
-   **Strategy:** `prefix_except_default` (no `/fr` in URLs)
-   **Translation files:** `locales/fr.json`, `locales/en.json`

### URL Examples

-   `/` → French (default)
-   `/en` → English
-   `/en/about` → "about" page in English

### Modifying the Prisma Schema

```bash
# 1. Edit prisma/schema.prisma
# 2. Create a migration
npm run db:migrate

# 3. (Optional) Re-seed data
npm run db:seed
```

---

## ESLint + Prettier Configuration

The project is configured with:

-   **Indentation:** Tabs
-   **Quotes:** Single quotes (`'`)
-   **Semicolons:** Required (`;`)
-   **Trailing commas:** Always

Automatic formatting happens on **Ctrl+S** (via Prettier) and is compatible with ESLint.

---

## Environment Variables

Copy `.env_exemple` to `.env` and adjust values:

```bash
cp .env_exemple .env
```

Important variables:

-   `DATABASE_URL` - MySQL connection string
-   `NODE_ENV` - `development` or `production`
-   `PORT` - Server port (default: 3020)
-   `HOST` - Server host (default: 0.0.0.0)

### Environment File Priority

The project uses separate environment files for different contexts:

-   `.env` - Local development (used by default)
-   `.env.production` - Production deployment (used by `db:migrate:prod`)

All npm scripts use `dotenv-cli` with the `-o` (override) flag to ensure `.env` values take precedence over system environment variables.

---

## Git Hooks

The project uses **Husky** + **lint-staged** to:

-   Automatically lint files before each commit
-   Automatically fix ESLint errors

Files `*.js`, `*.ts`, `*.vue` are linted automatically on commit.

---

## Project Structure

```
.
├── app/                  # Nuxt app directory
│   ├── app.vue          # Root component
│   └── generated/       # Auto-generated files (Prisma types)
├── i18n/
│   └── locales/         # Translation files (fr.json, en.json)
├── lib/
│   └── prisma.ts        # Prisma client singleton
├── prisma/              # Prisma ORM
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Database seeding script
│   └── migrations/      # Migration files
├── public/              # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── .husky/              # Git hooks (pre-commit)
├── docker-compose.yml   # MySQL container for local dev
├── eslint.config.mjs    # ESLint configuration
├── nuxt.config.ts       # Nuxt 4 configuration
├── prisma.config.ts     # Prisma configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (local dev)
└── .env.production      # Environment variables (production)
```

---

## License

Public project - All rights public

**Author:** GUILMIN Leny
