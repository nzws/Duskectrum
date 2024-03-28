import getClient from './getClient.tsx';
import { getUserDataByPass } from '@userDatabase';

export interface jokeData {
    jokeId: string;
    userId: string;
    time: string;
    content: string;
}

// deno-lint-ignore no-explicit-any
const normalizeJokeData = (rec: any) => {
    return {
        jokeId: rec.joke_id,
        userId: rec.user_id,
        time: rec.time,
        content: rec.content,
    };
};

const client = getClient();

await client.connect();

export const getAllJokeData = async () => {
    try {
        const res = await client.queryObject<jokeData>('select * from joke order by time desc');

        return res.rows.map((record) => normalizeJokeData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getJokeDataById = async (id: string) => {
    try {
        const res = await client.queryObject<jokeData>('select * from joke where joke_id = $1', [id]);

        if (res.rowCount === 0) return null;

        return normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const postJoke = async (rec: Pick<jokeData, 'userId' | 'content'>, pass: string) => {
    try {
        const userData = await getUserDataByPass(pass);

        if (!userData || userData.id !== rec.userId) return null;

        const res = await client.queryObject<jokeData>('insert into joke (user_id, content) values ($1, $2) returning *', [rec.userId, rec.content]);

        return normalizeJokeData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};
