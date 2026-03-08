# panapi

![Node](https://img.shields.io/badge/node-%3E%3D20.6.0-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

CLI generator for production-ready REST APIs with Node.js and Express.

Generate a complete, fully functional REST API from scratch in seconds — with your choice of language, level of robustness, database, and resources.

---

## Table of Contents

- [Introduction](#panapi)
- [Requirements](#requirements)
- [Installation](#installation)
- [CLI Options](#cli-options)
- [Levels](#levels)
  - [Basic](#basic)
  - [Standard](#standard)
    - [Standard with SQLite](#standard-with-sqlite)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [License](#license)

---

## Requirements

- Node.js >= 20.6.0
- npm

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd apirest-generator
npm install
```

### Link globally (use from anywhere)

Build and link the CLI so you can run it from any directory:

```bash
npm run build
npm link
```

From now on, run the generator from any folder with:

```bash
panapi
```

To unlink:

```bash
npm unlink -g apirest-generator
```

---

## Usage

```bash
panapi
```

The CLI will guide you through a series of questions and generate a ready-to-run REST API in the directory of your choice.

---

## CLI Options

### Project name

Only lowercase letters, numbers and hyphens. You can also provide a relative path:

```
my-api
../projects/my-api
```

> If a folder with that name already exists, the generator will show its path and cancel.

### Description

Optional. A brief description of your project.

### Level

Defines the structure and robustness of the generated API:

| Level        | Includes                                                 |
| ------------ | -------------------------------------------------------- |
| **Basic**    | Entry point, Server class, routes per resource           |
| **Standard** | Controllers, models, stores, middlewares, error handling |
| Advanced     | _(coming soon)_                                          |
| Complete     | _(coming soon)_                                          |

### Language

- **JavaScript**
- **TypeScript** — includes a pre-configured `tsconfig.json`

### Database

Available options depend on the selected level:

| Level     | Options                                           |
| --------- | ------------------------------------------------- |
| Basic     | None                                              |
| Standard  | None, SQLite                                      |
| Advanced+ | None, SQLite, MongoDB, SQL Server _(coming soon)_ |

### ORM

Assigned automatically based on the selected database:

| Database   | ORM                       |
| ---------- | ------------------------- |
| SQLite     | Sequelize                 |
| MongoDB    | Mongoose _(coming soon)_  |
| SQL Server | Sequelize _(coming soon)_ |

### Prettier

Adds a `.prettierrc` with standard configuration and a `format` script. Config applied:

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

Initial resources for your API in English and singular form, comma-separated:

```
user, product, order
```

The generator handles all naming conventions automatically:

| Input      | Singular   | Plural       | Class      |
| ---------- | ---------- | ------------ | ---------- |
| `user`     | `user`     | `users`      | `User`     |
| `category` | `category` | `categories` | `Category` |

> Each resource gets a full CRUD scaffold.

### Port

Default port for the server. Defaults to `3000`.

### Git

Optionally initializes a Git repository in the generated project.

### Docker

_(coming soon)_

---

## Levels

### Basic

A minimal but functional REST API. Perfect for quick prototypes or learning the structure.

**Generated structure:**

```
my-api/
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # Server class — middlewares, routes, start
│   └── routes/
│       └── user.router.ts # CRUD routes for each resource
├── package.json
├── .gitignore
├── tsconfig.json          # TypeScript only
└── .prettierrc            # If selected
```

**Scripts:**

```bash
npm run dev      # Run with hot reload
npm run build    # Compile to dist/ (TypeScript only)
npm run start    # Run compiled output
npm run lint     # Type check (TypeScript only)
npm run format   # Format with Prettier (if selected)
```

**What to modify:**

The API runs out of the box. To implement real logic, edit the route files:

```typescript
// src/routes/user.router.ts

router.get('/', (_req, res) => {
  // replace with your logic
  res.status(200).json({ success: true, data: [] });
});
```

**Example requests:**

```
GET    http://localhost:3000/api/ping
GET    http://localhost:3000/api/status
GET    http://localhost:3000/api/users
GET    http://localhost:3000/api/users/:id
POST   http://localhost:3000/api/users    body: { ... }
PUT    http://localhost:3000/api/users/:id  body: { ... }
DELETE http://localhost:3000/api/users/:id
```

All responses follow a consistent format:

```json
{ "success": true, "data": {} }
{ "success": false, "message": "..." }
```

---

### Standard

A structured API with controllers, models, middlewares and centralized error handling. Available with or without a database.

**Generated structure:**

```
my-api/
├── src/
│   ├── index.ts                # Entry point
│   ├── server.ts               # Server class
│   ├── configs/
│   │   └── app.config.ts       # Port, env, CORS origins, DB config
│   ├── controllers/
│   │   ├── index.ts
│   │   └── user.controller.ts  # Class with CRUD methods
│   ├── errors/
│   │   ├── HttpStatus.ts       # HTTP status code constants
│   │   └── ApiError.ts         # Custom error class with static methods
│   ├── middlewares/
│   │   ├── cors.ts             # CORS middleware using config
│   │   ├── errorHandler.ts     # Centralized error handler
│   │   └── logger.ts           # Request logger (method, url, status, duration)
│   ├── models/
│   │   └── user.model.ts       # Interface (no DB) or Sequelize model (SQLite)
│   ├── routes/
│   │   └── user.router.ts      # Instantiates controller and defines routes
│   ├── schemas/
│   │   └── user.schema.ts      # Zod schemas for request validation
│   └── stores/
│       ├── index.ts
│       └── user.store.ts       # CRUD logic (JSON file or Sequelize)
├── data/                       # JSON files (no DB) or SQLite file
└── ...shared files
```

**Scripts:**

```bash
npm run dev      # Run with hot reload
npm run build    # Compile to dist/ (TypeScript only)
npm run start    # Run compiled output
npm run lint     # Type check (TypeScript only)
npm run format   # Format with Prettier (if selected)
```

**What to modify:**

**1. Define your model fields** in `src/models/user.model.ts`:

```typescript
// TypeScript
export interface UserModel {
  id: string;
  createdAt: string;
  name: string; // add your fields
  email: string;
}
```

**2. Define your validation schema** in `src/schemas/user.schema.ts`:

```typescript
export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
```

The `updateUserSchema` is automatically derived as a partial — all fields optional.

**3. Your controller and routes are ready.** The store handles all CRUD operations — no changes needed unless you want custom logic.

**Error handling:**

Use `ApiError` static methods anywhere in your controllers:

```typescript
throw ApiError.notFound('User not found');
throw ApiError.badRequest('Invalid input');
throw ApiError.unauthorized('Not authenticated');
```

Zod validation errors are also handled automatically — a `400` response with field-level details is returned if the request body doesn't match the schema.

**Example requests:**

```
GET    http://localhost:3000/api/ping
GET    http://localhost:3000/api/status
GET    http://localhost:3000/api/users
GET    http://localhost:3000/api/users/:id
POST   http://localhost:3000/api/users    body: { "name": "John", "email": "john@mail.com" }
PUT    http://localhost:3000/api/users/:id  body: { "name": "John Updated" }
DELETE http://localhost:3000/api/users/:id
```

**POST with invalid body** returns a `400` with Zod error details:

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [{ "path": ["email"], "message": "Invalid email" }]
}
```

---

#### Standard with SQLite

When SQLite is selected, the following changes apply:

- `src/database/connection.ts` is generated — handles Sequelize connection and sync
- `src/models/user.model.ts` becomes a Sequelize model class instead of an interface
- `src/stores/user.store.ts` uses Sequelize methods instead of JSON file operations
- A `data/` folder is created where the `.sqlite` file is stored

**Define your model fields** in `src/models/user.model.ts`:

```typescript
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // id, createdAt and updatedAt are handled automatically by Sequelize
  declare name: string;
  declare email: string;
}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'User', tableName: 'users', timestamps: true }
);
```

> **Note on `sync({ alter: true })`:** The database connection uses `sync({ alter: true })`, which automatically updates the table structure when the model changes. This is convenient during development but **should not be used in production** — use migrations instead. To reset the database, use `sync({ force: true })` (warning: this deletes all data).

---

## Project Structure

```
src/
├── index.ts                  # Entry point
├── cli/
│   ├── index.ts              # Orchestrates the CLI flow
│   ├── types.ts              # Shared types and interfaces
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
│   ├── index.ts              # Orchestrates file generation
│   ├── resolvers.ts          # File lists per level
│   ├── fileWriter.ts         # Reads templates and writes files
│   ├── nomenclature.ts       # Naming conventions (singular, plural, pascalCase)
│   ├── dependencies.ts       # Dependency definitions per level
│   ├── helpers.ts            # Handlebars custom helpers
│   └── types.ts              # Generator types and interfaces
├── templates/
│   ├── shared/               # Templates used across all levels
│   ├── basic/                # Basic level templates
│   └── standard/             # Standard level templates
└── utils/
    ├── logger.ts             # Chalk-based console output
    ├── validators.ts         # Project name and folder validation
    └── format.ts             # String formatting helpers
```

---

## Technologies

| Package             | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `@inquirer/prompts` | Interactive CLI prompts                             |
| `chalk`             | Colored console output                              |
| `fs-extra`          | File system operations                              |
| `handlebars`        | Template engine for code generation                 |
| `zod`               | Schema validation                                   |
| `pluralize`         | Pluralization and singularization of resource names |
| `typescript`        | TypeScript compiler                                 |
| `tsx`               | Run TypeScript directly in development              |

---

## Scripts

```bash
npm run dev      # Run the generator in development with hot reload
npm run build    # Compile TypeScript to dist/
npm run start    # Run the compiled generator
npm run lint     # Type check without emitting
npm run format   # Format source files with Prettier
```

---

## Roadmap

- [x] Basic level — entry point, Server class, resource routers
- [x] Standard level — controllers, models, stores, middlewares, error handling
- [x] Standard + SQLite — Sequelize integration
- [ ] Advanced level — services, repositories, Pino logs, config by env
- [ ] Complete level — auth JWT, roles and permissions structure
- [ ] Docker support
- [ ] Publish to npm

---

## License

MIT
