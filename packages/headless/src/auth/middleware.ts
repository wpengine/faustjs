import { Response, Request } from 'express';
import { authorize } from './authorize';
import { storeAccessToken } from './cookie';

const AUTH_ENDPOINT =
  process.env.AUTH_ENDPOINT || process.env.NEXT_PUBLIC_AUTH_ENDPOINT;

if (!AUTH_ENDPOINT) {
  throw new Error(
    'AUTH_ENDPOINT and NEXT_PUBLIC_AUTH_ENDPOINT environment variables are not set. Please set AUTH_ENDPOINT (or NEXT_PUBLIC_AUTH_ENDPOINT if you wish to also use client-side requests) to your Next authorization endpoint.',
  );
}

export async function authorizeExpressHandler(req: Request, res: Response) {
  try {
    const { code } = req.body as { code?: string };

    if (!code) {
      res.status(400).send({
        message: 'No authentication code found',
      });

      return;
    }

    const result = await authorize(code);
    storeAccessToken(result.access_token, res);
    res.status(200).send(result);
  } catch (e) {
    if (e.status) {
      res.status(e.status);
    } else {
      res.status(500);
    }

    res.send(e);
  }
}
