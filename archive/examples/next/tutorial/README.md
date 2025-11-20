# Learn Faust.js

Next.js app to be used with the [Learn Faust tutorial](https://faustjs.org/docs/tutorial/learn-faust/).

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start everything**
   ```bash
   npm run dev
   ```

That's it! The first time you run `npm run dev`, it will automatically:
- Create your `.env.local` configuration file
- Start WordPress with Docker
- Import the pre-configured database
- Start the Next.js development server

## Access Points

- **Frontend**: [http://localhost:3000/](http://localhost:3000/)
- **WordPress Admin**: [http://localhost:8888/wp-admin/](http://localhost:8888/wp-admin/)
  - Username: `admin`
  - Password: `password`

## What's Pre-configured?

The tutorial environment comes with:
- ✅ WPGraphQL plugin (active)
- ✅ FaustWP plugin (active)
- ✅ GraphQL introspection enabled
- ✅ Permalink structure: `/blog/%postname%/`
- ✅ Faust secret key configured
- ✅ Demo content ("Hello world!" post, "Sample Page")

## Available Commands

| Command         | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `dev`           | Start everything (WordPress + Next.js)                        |
| `dev:next`      | Run Next.js development server only                           |
| `build`         | Build the Next.js application for production                  |
| `wp:start`      | Start the WordPress environment                               |
| `wp:stop`       | Stop the WordPress environment                                |
| `wp:destroy`    | Completely remove the WordPress environment                   |
| `wp:db:export`  | Export the WordPress database                                 |
| `wp:db:import`  | Import the WordPress database                                 |

## Prerequisites

- Node.js (v18+ recommended)
- [Docker](https://www.docker.com/) (required for WordPress with wp-env)

Make sure Docker is running before starting (`docker ps`)

## Learn More

For detailed step-by-step instructions on using Faust.js features, visit the [Learn Faust tutorial](https://faustjs.org/docs/tutorial/learn-faust/).
