import { jokeData } from "@jokeDatabase";

export const testJokeDatabase: jokeData[] = [
    {
        jokeId: '3',
        userId: '1',
        time: '2024-01-03T00:00:00.00+09:00',
        content: 'This is a test joke posted in 2024/01/03.\n'.repeat(3),
    },
    {
        jokeId: '2',
        userId: '1',
        time: '2024-01-02T00:00:00.00+09:00',
        content: 'This is a test joke posted in 2024/01/02.\n'.repeat(3),
    },
    {
        jokeId: '1',
        userId: '1',
        time: '2024-01-01T00:00:00.00+09:00',
        content: 'This is a test joke posted in 2024/01/01.\n'.repeat(3),
    },
];
