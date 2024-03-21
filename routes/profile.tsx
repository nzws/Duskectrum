import { Head } from '$fresh/runtime.ts';
import { JSX } from 'preact/jsx-runtime';
import Board from '../islands/Original/Frame/Board.tsx';

export default function Profile() {
    type profileItemProps = {
        name: string;
        children: JSX.Element;
    };

    const ProfileItem = ({ name, children }: profileItemProps): JSX.Element => {
        const contentStyle: JSX.CSSProperties = {
            marginLeft: 'calc(12pt * 2)',
        };

        return (
            <p class='flex flex-col'>
                <span>
                    <u>{name}:</u>
                </span>
                <span style={contentStyle}>{children}</span>
            </p>
        );
    };

    const imageStyle: JSX.CSSProperties = {
        width: '256px',
        height: '256px',
    };

    return (
        <>
            <Head>
                <title>Profile - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Profile</h1>

                    <figure>
                        <div class='gallery justify-center'>
                            <img style={imageStyle} src='/image/me.jpg' />
                        </div>
                    </figure>

                    <div class='content flex justify-center'>
                        <div class='w-auto'>
                            <ProfileItem name='Name'>
                                <>Sara Kotova</>
                            </ProfileItem>
                            <ProfileItem name='Birthday'>
                                <>December 11th</>
                            </ProfileItem>
                            <ProfileItem name='E-Mail'>
                                <>['Sara', 'Kotova', '@', 'proton.me'].join('').toLowerCase();</>
                            </ProfileItem>
                        </div>
                    </div>
                </>
            </Board>
        </>
    );
}
