import { Head } from '$fresh/runtime.ts';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';
import Link from '../../../components/Common/Link.tsx';

export default function Post() {
    const command = {
        installPackage: `$ sudo apt -y install gparted
$ sudo apt -y install pigz
$ sudo apt -y install pv`,
        backup: `$ sudo dd if=/dev/nvme0n1 bs=16M | pv | pigz > "/media/\${USER}/Backup Volume/nvme0n1.gz"`,
        backdown: `$ unpigz -c < "/media/\${USER}/Backup Volume/nvme0n1.gz" | pv | sudo dd of=/dev/nvme0n1 bs=16M`,
    };

    return (
        <>
            <Head>
                <title>Backup Volume - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Backup Volume</h1>

                    <p>
                        何度も同じ環境を構築する場合や機材の大事に備える場合は、ストレージのバックアップを推奨します。
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
                            <li><b>Parallel G-Zip</b>：マルチコア（並列処理）でファイルの圧縮や解凍を行います。</li>
                            <li><b>Pipe Viewer</b>：パイプに流れるデータの状況を表示します。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.installPackage} />
                    </div>

                    <h2>バックアップ</h2>

                    <ol>
                        <li><code>lsblk</code>コマンドでデバイスの一覧を表示します。ここで、バックアップ元とバックアップ先を確認します。</li>
                        <li>必要に応じてGPartedでパーティションテーブルの作成を行います。</li>
                        <li>以下のコマンドでボリュームのバックアップを行います。</li>
                        <ul>
                            <li>文字列に空白（<code> </code>）が含まれる場合は空白をエスケープ（<code>\ </code>）するか、引用符（<code>"</code>）で囲む必要があります。</li>
                            <li>パスやバッファリングサイズ、オプションは場合に応じて変更してください。</li>
                            <li>時間を短縮する（演算よりも入出力に時間が掛かる）ため、<code>dd</code>コマンドで取得したボリュームのデータを圧縮してからファイルへ出力します。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.backup} />
                    </div>

                    <h2>バックダウン</h2>

                    <ol>
                        <li><code>lsblk</code>コマンドでデバイスの一覧を表示します。ここで、バックダウン元とバックダウン先を確認します。</li>
                        <li>必要に応じてGPartedでパーティションテーブルの作成を行います。</li>
                        <li>以下のコマンドでボリュームのバックダウンを行います。</li>
                        <ul>
                            <li>時間を短縮する（演算よりも入出力に時間が掛かる）ため、<code>unpigz</code>コマンドでファイルを展開してからボリュームにデータを出力します。</li>
                        </ul>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.backdown} />
                    </div>
                </>
            </Board>
        </>
    );
}
