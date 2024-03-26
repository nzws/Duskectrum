import { Head } from '$fresh/runtime.ts';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';
import Link from '../../../components/Common/Link.tsx';

export default function Post() {
    const command = {
        installPackage: `$ sudo apt -y install gparted`,
        shredAllSpace: `$ sudo shred -n 1 -vz /dev/nvme0n1`,
        shredFreeSpaceA: `$ sudo dd if=/dev/urandom of="/media/\${USER}/Remove Volume/tempfile" bs=1k count=XXXXXXXX`,
        shredFreeSpaceB: `$ sudo shred -n 1 -vz "/media/\${USER}/Remove Volume/tempfile"`,
    };

    return (
        <>
            <Head>
                <title>Clean Volume - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Clean Volume</h1>

                    <p>
                        コンピューターやストレージを破棄・譲渡する場合は、必ずデータを抹消しましょう。ファイルをゴミ箱から消去したりOSを初期化しても、データは完全に削除されていません。
                    </p>

                    <h2>準備</h2>

                    <ol>
                        <li>DVDやUSBメモリーを用いてライブ起動するストレージを作成します。</li>
                        <ol>
                            <li>Linuxディストリビューションのイメージファイルをダウンロードします。特に拘りがなければ<Link href='https://ubuntu.com/download'>Ubuntu</Link>や<Link href='https://www.debian.org/'>Debian</Link>といったメジャーなLinuxディストリビューションを選択しましょう。</li>
                            <li>ストレージを起動可能にするソフトウェア（例えば<Link href='https://etcher.balena.io/'>balenaEtcher</Link>や<Link href='https://rufus.ie/en/'>Rufus</Link>等）を利用してストレージにイメージファイルを書き込みます。</li>
                            <li>対象のコンピューターを起動します。その際に、BIOSやUEFIから起動デバイスの選択、あるいは変更を行います。</li>
                            <li>ライブ起動を選択してLinuxを立ち上げます。</li>
                        </ol>
                        <ul>
                            <li>起動に失敗する場合は、異なるLinuxディストリビューションやバージョンを使用することで成功するかもしれません。</li>
                        </ul>
                        <li>インターネットに接続します。</li>
                        <li>ターミナルを起動して必要なパッケージを入手します。</li>
                        <ul>
                            <li><b>GParted</b>：ボリュームを視覚的に編集します。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.installPackage} />
                    </div>

                    <h2>ボリュームの全体領域を抹消</h2>

                    <ol>
                        <li><code>lsblk</code>コマンドでデバイスの一覧を表示します。ここで、対象のパスを確認します。</li>
                        <li>以下のコマンドでボリュームの内容を抹消します。</li>
                        <ul>
                            <li>パスやオプションは場合に応じて変更してください。</li>
                            <li>SSD等のデバイスは仕様として不連続の内容を同じデータ領域（ブロック）に保存する可能性があるため、高品質なセキュリティーが要求される場合はSecure Eraseを用いて抹消するか、連続した乱数を出力するために次項の「ボリュームの空き領域を抹消」する必要があります。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.shredAllSpace} />
                    </div>

                    <h2>ボリュームの空き領域を抹消</h2>

                    <ol>
                        <li>必要に応じてGPartedでパーティションテーブルとパーティションの作成を行います。</li>
                        <li><code>df</code>コマンドでストレージの一覧を表示します。ここで、対象のパスと空き容量を確認します。</li>
                        <li>ダミーファイルを作成します。</li>
                        <ul>
                            <li>文字列に空白（<code> </code>）が含まれる場合は空白をエスケープ（<code>\ </code>）するか、引用符（<code>"</code>）で囲む必要があります。</li>
                            <li>パスやバッファリングサイズは場合に応じて変更してください。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.shredFreeSpaceA} />
                    </div>

                    <ol>
                        <li value={4}>ダミーファイルを抹消します。</li>
                        <ul>
                            <li>パスやオプションは場合に応じて変更してください。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.shredFreeSpaceB} />
                    </div>
                </>
            </Board>
        </>
    );
}
