# Learn Faust.js

Next.js app to be used with the [Learn Faust tutorial](https://faustjs.org/docs/tutorial/learn-faust/).

## Prerequisites

- Node.js (v18+ recommended)
- [Docker](https://www.docker.com/) (required for running WordPress with wp-env)

**Note:** Make sure Docker is running before starting (`docker ps`)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy the example file and configure:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start WordPress and the development server**
   ```bash
   npm run tutorial:setup    # First time setup
   npm run tutorial:start    # Start WordPress and Next.js dev server
   ```

4. **Access the application**
   - Frontend: [http://localhost:3000/](http://localhost:3000/)
   - WordPress Admin: [http://localhost:8888/wp-admin/](http://localhost:8888/wp-admin/)

   > **Default credentials:** username: `admin`, password: `password`

5. **Configure Faust in WordPress**

   Follow the tutorial at [faustjs.org/docs/tutorial/learn-faust/](https://faustjs.org/docs/tutorial/learn-faust/) to complete the setup.

## Available Commands

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `tutorial:setup`   | Initial setup: installs packages, starts wp-env, imports DB   |
| `tutorial:start`   | Starts WordPress and the Next.js development server           |
| `tutorial:stop`    | Stops the WordPress environment                                |
| `tutorial:prune`   | Rebuilds everything from scratch                               |
| `wp:start`         | Starts the WordPress environment                               |
| `wp:stop`          | Stops the WordPress environment                                |
| `wp:destroy`       | Completely removes the WordPress environment                   |
| `wp:db:query`      | Executes a database query within the WordPress environment     |
| `wp:db:export`     | Exports the WordPress database to `wp-env/db/database.sql`    |
| `wp:db:import`     | Imports the WordPress database from `wp-env/db/database.sql`  |
| `dev`              | Runs the Next.js development server only                       |
| `build`            | Builds the Next.js application for production                  |

## Project Structure

```
├── src                                # Next.js application source
├── .wp-env.json                       # wp-env configuration file
└── wp-env
    ├── db
    │   └── database.sql               # WordPress database with pre-configured settings
    ├── setup
    │   └── .htaccess                  # CORS configuration
    └── uploads                        # WordPress uploads directory
```

## Learn More

For detailed step-by-step instructions, visit the [Learn Faust tutorial](https://faustjs.org/docs/tutorial/learn-faust/).
