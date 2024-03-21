import { Head } from '$fresh/runtime.ts';
import Board from '../islands/Original/Frame/Board.tsx';

export default function Template() {
    return (
        <>
            <Head>
                <title>[TITLE] - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>[TITLE]</h1>

                    <p>
                        [CONTENT]
                    </p>
                </>
            </Board>
        </>
    );
}
