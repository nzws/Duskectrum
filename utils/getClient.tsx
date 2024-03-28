import { Client } from 'postgress';
import 'dotenv/load.ts';

export default function getClient(): Client {
    return new Client({
        user: Deno.env.get('DB_USER'),
        database: Deno.env.get('DB_NAME'),
        hostname: Deno.env.get('DB_HOST'),
        port: Deno.env.get('DB_PORT'),
        password: Deno.env.get('DB_PASSWORD'),
    });
}
