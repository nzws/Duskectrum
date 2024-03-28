import getClient from './getClient.tsx';

const publicColumn = 'id, name';

export interface userData {
    id: string;
    name: string;
}

// deno-lint-ignore no-explicit-any
const normalizeUserData = (rec: any) => {
    return {
        id: rec.id,
        name: rec.name,
    };
};

const client = getClient();

await client.connect();

export const getAllUserData = async () => {
    try {
        const res = await client.queryObject<userData>(`select ${publicColumn} from account`);

        return res.rows.map((record) => normalizeUserData(record));
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getUserDataById = async (id: string) => {
    try {
        const res = await client.queryObject<userData>(`select ${publicColumn} from account where id = $1`, [id]);

        if (res.rowCount === 0) return null;

        return normalizeUserData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const getUserDataByPass = async (pass: string) => {
    try {
        const res = await client.queryObject<userData>(`select ${publicColumn} from account where pass = $1`, [pass]);

        if (res.rowCount === 0) return null;

        return normalizeUserData(res.rows[0]);
    } catch (e) {
        console.error(e);

        return null;
    }
};
