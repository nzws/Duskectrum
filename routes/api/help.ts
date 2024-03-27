import { FreshContext } from '$fresh/server.ts';

const res = [
    {
        title: 'Help',
        summary: 'Show all public APIs.',
        url: '/api/help',
    },
    {
        title: 'Get SHA-256',
        summary: 'Generate a hash (SHA-256) from a string.',
        url: '/api/getSha256',
        request: {
            query: {
                rec: 'string',
            },
        },
        response: 'string',
    },
];

export const handler = (_req: Request, _ctx: FreshContext): Response => {
    return new Response(JSON.stringify(res, null, '\t'));
};
