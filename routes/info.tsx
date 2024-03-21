import { Head } from '$fresh/runtime.ts';
import Board from '../islands/Original/Frame/Board.tsx';
import InfoAdvance from '../islands/Original/Info/InfoAdvance.tsx';
import Link from '../components/Common/Link.tsx';

export default function Info() {
    return (
        <>
            <Head>
                <title>Info - Duskectrum</title>
            </Head>

            <Board className='document'>
                <>
                    <h1>Info</h1>

                    <InfoAdvance />

                    <p>
                        Go to <Link href='/'>home</Link> page.
                    </p>
                </>
            </Board>
        </>
    );
}
