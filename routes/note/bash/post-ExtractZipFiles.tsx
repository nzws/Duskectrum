import { Head } from '$fresh/runtime.ts';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';

export default function Post() {
    const command = {
        extractZipFiles: `$ extractZipFiles ~/"Test Directory" ~/"Extract Directory"`,
    };

    const list = {
        testDirectory: `- Test Folder A.zip
    - Test Folder
        - Test File
- Test Folder B.zip
    - Test Folder
        - Test File
- Test Folder C.zip
    - Test Folder
        - Test File
- Test Folder D.7z
    - Test Folder
        - Test File
- Test Folder E.tar
    - Test Folder
        - Test File
- Test Folder F.tar.gz
    - Test Folder
        - Test File`,
        extractDirectory: `- Test Folder A
    - Test Folder
        - Test File
- Test Folder B
    - Test Folder
        - Test File
- Test Folder C
    - Test Folder
        - Test File
- Test Folder D
    - Test Folder
        - Test File
- Test Folder E
    - Test Folder
        - Test File
- Test Folder F
    - Test Folder
        - Test File`,
    };

    const file = {
        extractZipFiles: `#!/bin/bash

# set -x

target="$1"
output="$2"
format=".*\\.(zip|ZIP|7z|7Z|tar|TAR|gz|GZ)"

function extractFile() {
    local target="$1"
    local file="\${target##*/}"
    local double

    if [[ "\${file%.*}" =~ ^.*.(tar|TAR)$ ]]; then
        local file="\${file%.*}"
        local double=true
    fi

    if [[ -n "$2" ]]; then
        local output="\${2%/}/\${file%.*}"/
    else
        local output="\${target%/*}/\${file%.*}"/
    fi

    if [[ -z "$double" ]]; then
        7z x -o"$output" "$target"
    else
        7z x -so "$target" | 7z x -si -ttar -o"$output"
    fi

    echo "Extract file ... \${target} -> \${output}"
}

export -f extractFile

find "$target" -regextype posix-extended -regex "$format" -type f -print0 | xargs -0 -i bash -c "extractFile \\"{}\\" \\"\${output}\\""`,
    };

    return (
        <>
            <Head>
                <title>Extract Zip Files - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Extract Zip Files</h1>

                    <p>
                        GUIでは複数の圧縮ファイルを一括で展開するとき、全てをサブフォルダー付きで展開することができません。その問題を解決するために、簡易的なスクリプトを作成しました。
                    </p>

                    <div class='content'>
                        <Code title='/usr/local/bin/extractZipFiles' content={file.extractZipFiles} />
                    </div>

                    <ul>
                        <li>Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（<code>#!/bin/bash</code>）を書くことで機能を明示します。</li>
                        <li>文字列に空白（<code> </code>）が含まれる場合は空白をエスケープ（<code>\ </code>）するか、引用符（<code>"</code>）で囲む必要があります。また、引用符の内部で引用符を記述する場合も同様にエスケープ（<code>\"</code>）する必要があります。</li>
                        <li>変数展開とパターンマッチ（<code>{'${変数名(#|##|%|%%)パターン}'}</code>）を用いることでディレクトリーの抽出やパスの正規化を行います。</li>
                        <li><code>7z</code>コマンドで展開したデータをパイプ（<code>|</code>）で再び<code>7z</code>コマンドに渡すことで、また、その際に<code>-so</code>オプションと<code>-si</code>オプションを用いることで二重に圧縮されたファイル（<code>.tar.gz</code>等）を展開します。</li>
                        <li>定義された関数（シェル関数）は<code>xargs</code>コマンドで呼び出せないため、<code>export</code>コマンドと<code>-f</code>オプションで関数を環境変数に設定します。また、<code>xargs</code>コマンドでは<code>bash</code>コマンドに<code>-c</code>オプションを付与することで文字列をコマンドとして実行します。</li>
                        <li><code>xargs</code>コマンドは改行や空白を区切りとして処理するため、パスに空白が含まれると正常に動作しません。それを解決するため、<code>find</code>コマンドでは<code>-print0</code>オプションを付与することで一覧の区切りをNULL文字（<code>/0</code>）で記述します。また、<code>xargs</code>コマンドでは<code>-0</code>オプションを付与することでNULL文字を区切りとして処理します。</li>
                        <li>スクリプトは汎用性を考慮してPATHが通る場所に設置することが推奨されます。</li>
                    </ul>

                    <p>
                        スクリプトを実行すると、以下の結果となります。
                    </p>

                    <div class='content'>
                        <Code title='~/Test Directory' content={list.testDirectory} />
                    </div>

                    <div class='content'>
                        <Code title='Bash' content={command.extractZipFiles} />
                    </div>

                    <div class='content'>
                        <Code title='~/Extract Directory' content={list.extractDirectory} />
                    </div>
                </>
            </Board>
        </>
    );
}
