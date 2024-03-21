import { Head } from '$fresh/runtime.ts';
import { useSignal } from '@preact/signals';
import Board from '../islands/Original/Frame/Board.tsx';
import Link from '../components/Common/Link.tsx';
import MultilingualContent from '../islands/Original/Miscellaneous/MultilingualContent.tsx';
import MultilingualContentSwitcher from '../islands/Original/Miscellaneous/MultilingualContentSwitcher.tsx';

export default function Error404() {
    const en = (
        <>
            <h1>OOPS!</h1>

            <p>
                Page does not exist. The URL may contain typos or omissions, or may have been deleted by an administrator.
            </p>

            <p>
                Go to <Link href='/'>home</Link> page.
            </p>
        </>
    );

    const ja = (
        <>
            <h1>おっと！</h1>

            <p>
                ページは存在しません。URLに誤字・脱字が含まれているか、管理者によって削除された可能性があります。
            </p>

            <p>
                <Link href='/'>ホーム</Link>に戻りましょう。
            </p>
        </>
    );

    const signal = useSignal('en');

    return (
        <>
            <Head>
                <title>404 - Duskectrum</title>
            </Head>

            <Board className='document'>
                <>
                    <MultilingualContentSwitcher
                        language={[
                            { name: 'English', code: 'en' },
                            { name: '日本語', code: 'ja' },
                        ]}
                        signal={signal}
                    />

                    <MultilingualContent language='en' signal={signal}>
                        {en}
                    </MultilingualContent>
                    <MultilingualContent language='ja' signal={signal}>
                        {ja}
                    </MultilingualContent>
                </>
            </Board>
        </>
    );
}
