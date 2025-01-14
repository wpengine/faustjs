# `faustRouteHandler`

`faustRouteHandler` is an API handler for App router projects. It's main purpose is to manage Faust.js API logic, such as authentication and internal route handling.

## Usage

Create a file `/app/api/faust/[route]/route.js` with the following contents:

```js
  import { faustRouteHandler } from '@faustwp/experimental-app-router';

  const { GET, POST } = faustRouteHandler;

  export { GET, POST };
```

## Technical Reference

The `faustRouteHandler` is an object with the following properties:

`GET`

Handles GET requests over the `/app/api/faust/*` endpoint.

`POST`

Handle POST requests over the `/app/api/faust/*` endpoint.

## Additional Context

- [Next.js Route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
