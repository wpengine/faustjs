import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-fetch';
import { config } from './client';

export async function authorize(req: NextApiRequest, res: NextApiResponse) {
    const cfg = config();

    if (!cfg || !cfg.secret) {
        throw new Error(
            'You must set your configuration with a baseUrl and secret for your WP site.',
        );
    }

    try {
        const response = await fetch(
            `${cfg.baseUrl}/wp-json/wpac/v1/authorize`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-wp-api-secret': cfg.secret,
                },
                method: 'POST',
                body: JSON.stringify({
                    code: req.body.code,
                }),
            },
        );

        const result = await response.json();

        if (!response.ok) {
            res.status(response.status).send(result);

            return;
        }

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}
