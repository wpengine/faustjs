import { Response, Request } from 'express';
import fetch from 'isomorphic-fetch';
import { ApiConfig } from '../types';
import { normalizeConfig } from '../utils';

export function authorizeExpressHandler(config: ApiConfig) {
  const cfg = normalizeConfig(config);

  if (!cfg || !cfg.secret) {
    throw new Error(
      'You must set your configuration with a baseUrl and secret for your WP site.',
    );
  }

  return async function authorize(req: Request, res: Response) {
    try {
      const { code } = req.body as { code?: string };

      if (!code) {
        res.status(400).send({
          message: 'No authentication code found',
        });

        return;
      }

      const response = await fetch(`${cfg.baseUrl}/wp-json/wpac/v1/authorize`, {
        headers: {
          'Content-Type': 'application/json',
          'x-wpe-headless-secret': cfg.secret as string,
        },
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
      });

      const result = (await response.json()) as { access_token?: string };

      if (!response.ok) {
        res.status(response.status).send(result);

        return;
      }

      res.status(200).send(result);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
