# panapi

CLI generator for production-ready REST APIs with Node.js and Express.

## Requirements

- Node.js >= 20.6.0
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd apirest-generator
npm install
```

## Usage

```bash
npm run dev
```

The CLI will guide you through a series of questions to configure your project.

---

## Configuration options

### Project name

Only lowercase letters, numbers and hyphens are allowed.

```
my-api
my-project-api
```

You can also provide a relative path to generate the project in a different location:

```
../my-api
../../projects/my-api
```

If a folder with that name already exists, the generator will show its location and cancel.

### Description

Optional. A brief description of your project.

### Language

- **JavaScript**
- **TypeScript** — includes a pre-configured `tsconfig.json`

### Level

| Level     | Includes                                       |
| --------- | ---------------------------------------------- |
| **Basic** | Entry point, Server class, routes per resource |
| Standard  | _(coming soon)_                                |
| Advanced  | _(coming soon)_                                |
| Complete  | _(coming soon)_                                |

### Prettier

Includes a standard `.prettierrc` configuration. If selected, a `format` script is added to `package.json`.

Default config:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 120,
  "arrowParens": "always"
}
```

### Resources

Define the initial resources for your API in English and singular form, separated by commas:

```
user, product, order
```

The generator handles pluralization and casing automatically:

| Input      | Singular   | Plural       | Class      |
| ---------- | ---------- | ------------ | ---------- |
| `user`     | `user`     | `users`      | `User`     |
| `product`  | `product`  | `products`   | `Product`  |
| `category` | `category` | `categories` | `Category` |

### Port

Default port for the server. Defaults to `3000`.

### Git

Optionally initialize a Git repository in the generated project.

### Docker

_(coming soon)_

---

## Generated project structure — Basic level

```
my-api/
├── src/
│   ├── server.ts / server.js
│   └── routes/
│       └── {resource}.router.ts / {resource}.router.js
├── index.ts / index.js
├── package.json
├── .gitignore
├── tsconfig.json        (TypeScript only)
└── .prettierrc          (if selected)
```

### Entry point — `index.ts`

```typescript
import { Server } from './src/server.js';

const server = new Server();
```

### Server class — `src/server.ts`

The server is implemented as a class with clear separation of concerns:

- `middlewares()` — registers CORS and JSON body parser
- `routes()` — registers all resource routers and a 404 handler
- `start()` — starts the HTTP server on the configured port
- `status()` — returns server metadata (status, version, environment, port)

Includes a health check endpoint out of the box:

```
GET /api/ping → { success: true, message: "pong" }
```

### Routers — `src/routes/{resource}.router.ts`

Each resource gets a fully scaffolded router with the following endpoints:

| Method | Path                   | Description |
| ------ | ---------------------- | ----------- |
| GET    | `/api/{resources}`     | Get all     |
| GET    | `/api/{resources}/:id` | Get by id   |
| POST   | `/api/{resources}`     | Create      |
| PUT    | `/api/{resources}/:id` | Update      |
| DELETE | `/api/{resources}/:id` | Delete      |

All responses follow a consistent format:

```json
{ "success": true, "data": {} }
```

---

## Generated project scripts

### TypeScript

```bash
npm run dev      # run with hot reload (tsx watch)
npm run build    # compile to dist/
npm run start    # run compiled output
npm run lint     # type check without emitting
npm run format   # format with Prettier (if selected)
```

### JavaScript

```bash
npm run dev      # run with hot reload (nodemon)
npm run start    # run directly with Node
npm run format   # format with Prettier (if selected)
```

---

## Development

### Project structure

```
src/
├── index.ts                  # entry point
├── cli/
│   ├── index.ts              # orchestrates the CLI flow
│   ├── types.ts              # shared types and interfaces
│   └── questions/
│       ├── name.ts
│       ├── description.ts
│       ├── language.ts
│       ├── level.ts
│       ├── prettier.ts
│       ├── database.ts
│       ├── orm.ts
│       ├── auth.ts
│       ├── resources.ts
│       ├── port.ts
│       ├── git.ts
│       └── docker.ts
├── generator/
│   ├── index.ts              # orchestrates file generation
│   ├── fileWriter.ts         # reads templates and writes files
│   ├── nomenclature.ts       # handles naming conventions
│   ├── dependencies.ts       # dependency definitions per level
│   ├── helpers.ts            # Handlebars custom helpers
│   └── types.ts              # generator types
├── templates/
│   ├── shared/               # templates used across all levels
│   └── basic/                # Basic level templates
└── utils/
    ├── logger.ts             # chalk-based console output
    ├── validators.ts         # project name and folder validation
    └── format.ts             # string formatting helpers
```

### Running in development

```bash
npm run dev
```

### Building

```bash
npm run build
```

---

## Roadmap

- [x] Basic level — entry point, Server class, resource routers
- [ ] Standard level — controllers, models, middlewares, error handling
- [ ] Advanced level — services, repositories, logs (Pino), config by env
- [ ] Complete level — auth JWT, roles and permissions structure
- [ ] Database support — SQLite, MongoDB, SQL Server
- [ ] ORM support — Sequelize, Mongoose
- [ ] Docker support
