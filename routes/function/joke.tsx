import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import Board from '../../islands/Original/Frame/Board.tsx';
import Frame from '../../islands/Original/Frame/Frame.tsx';
import concatWords from '../../islands/Utility/concatWords.tsx';
import { getAllUserData, getUserDataByPass } from '@userDatabase';
import { getAllJokeData, postJoke } from '@jokeDatabase';
import getSha256 from '../../islands/Utility/getSha256.tsx';
import getTimeDisplay from '../../islands/Utility/getTimeDisplay.tsx';

export type userData = {
    id: string;
    name: string;
};

export type jokeData = {
    jokeId: string;
    userId: string;
    time: string;
    content: string;
};

type getJokeProps = {
    user: userData[];
    joke: jokeData[];
};

type postJokeProps = {
    error?: string;
    rec?: {
        name?: string;
        content?: string;
    };
};

type jokeProps = {
    get?: getJokeProps;
    post?: postJokeProps;
};

export const handler: Handlers<jokeProps | null> = {
    async GET(_, ctx) {
        const user = await getAllUserData();
        const joke = await getAllJokeData();

        if (user && joke) {
            return ctx.render({
                get: {
                    user: user,
                    joke: joke,
                },
            });
        } else {
            return ctx.render(null);
        }
    },
    async POST(req, ctx) {
        const formData = await req.formData();

        const name = formData.get('name')?.toString();
        const code = formData.get('code')?.toString();
        const content = formData.get('content')?.toString();

        const res = async (error: string, clear: boolean) => {
            const user = await getAllUserData();
            const joke = await getAllJokeData();

            const post = {
                error: error,
                rec: {
                    name: name,
                    content: !clear ? content : '',
                },
            };

            if (user && joke) {
                return {
                    get: {
                        user: user,
                        joke: joke,
                    },
                    post: post,
                };
            } else {
                return {
                    post: post,
                };
            }
        };

        if (!name || !code || !content)
            return ctx.render(await res(`Please enter ${concatWords([!name ? 'name' : '', !code ? 'code' : '', !content ? 'joke' : ''])}!`, false));

        const pass = await getSha256(`${name}${code}`);

        const userData = await getUserDataByPass(pass);

        if (!userData) return ctx.render(await res('User authentication failed!', false));

        const rec = await postJoke(
            {
                userId: userData.id,
                content: content,
            },
            pass
        );

        if (!rec) {
            return ctx.render(await res('Posting failed!', false));
        } else {
            return ctx.render(await res('', true));

            // return new Response('', {
            //     status: 303,
            //     headers: {
            //         Location: '/function/joke',
            //     },
            // });
        }
    },
};

export default function Joke({ data }: PageProps<jokeProps | null>) {
    const user = data?.get?.user;
    const joke = data?.get?.joke;

    const error = data?.post?.error;
    const rec = data?.post?.rec;

    return (
        <>
            <Head>
                <title>Joke - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Joke (Tweet System)</h1>

                    {user && joke ? (
                        <>
                            <div class='content'>
                                <Frame
                                    title='Post new joke'
                                    height='auto'
                                    frameStyle='card'
                                    frameType={['setMaximize', error ? '' : 'fold', 'setFold']}
                                    className='document'
                                >
                                    <>
                                        <ul>
                                            <li>
                                                Allow read:{' '}
                                                <b>
                                                    <span class='lime_tc'>all users</span>
                                                </b>
                                            </li>
                                            <li>
                                                Allow post:{' '}
                                                <b>
                                                    <span class='yellow_tc'>limited users</span>
                                                </b>
                                            </li>
                                        </ul>

                                        {error && <p class='red_tc'>{error}</p>}

                                        <div class='content'>
                                            <form method='POST'>
                                                <fieldset>
                                                    <div>
                                                        <div class='label'>Name: </div>
                                                        <input name='name' type='text' placeholder='Your name' value={rec?.name} />
                                                    </div>
                                                    <div>
                                                        <div class='label'>Code: </div>
                                                        <input name='code' type='password' placeholder='Your code' />
                                                    </div>
                                                </fieldset>
                                                <fieldset>
                                                    <div class='label'>Joke: </div>
                                                    <textarea name='content' value={rec?.content}></textarea>
                                                </fieldset>
                                                <fieldset>
                                                    <button type='submit'>Post</button>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </>
                                </Frame>
                            </div>

                            {joke.length !== 0 ? (
                                joke.map((joke) => {
                                    const name = user.find((user) => user.id === joke.userId)?.name || 'Unknown';
                                    const time = getTimeDisplay(new Date(joke.time));

                                    return (
                                        <div class='content'>
                                            <Frame
                                                title={`${time.date} ${time.time} | ${name}:`}
                                                height='auto'
                                                frameStyle='card'
                                                frameType={['setMaximize', 'setHide']}
                                                className='document'
                                            >
                                                <pre>{joke.content}</pre>
                                            </Frame>
                                        </div>
                                    );
                                })
                            ) : (
                                <p class='yellow_tc'>Nothing posted...</p>
                            )}
                        </>
                    ) : (
                        <p class='red_tc'>Failed to retrieve database...</p>
                    )}
                </>
            </Board>
        </>
    );
}
