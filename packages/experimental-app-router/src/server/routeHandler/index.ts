import { notFound } from 'next/navigation.js';
import { tokenHandler } from './tokenHandler.js';

export async function GetFn(req: Request) {
  const { pathname } = new URL(req.url);

  switch (pathname) {
    case '/api/faust/token': {
      return tokenHandler(req);
    }
    default: {
      return notFound();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PostFn(req: Request) {
  // Intentionally left empty if/until we have POST endpoints.
}

export const faustRouteHandler = {
  GET: (req: Request) => GetFn(req),
  POST: (req: Request) => PostFn(req),
};
