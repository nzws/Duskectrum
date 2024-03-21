import { FreshContext } from '$fresh/server.ts';

const res = [
    {
        title: 'Help',
        summary: 'Show all public APIs.',
        url: '/api/help.ts',
    },
];

export const handler = (_req: Request, _ctx: FreshContext): Response => {
    return new Response(JSON.stringify(res, null, '\t'));
};
