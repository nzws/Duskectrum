import { Head } from '$fresh/runtime.ts';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';

export default function Post() {
    const sample = {
        testFunctionA: `$ bash ~/"Some Bash Script A.sh"
Hello, John Smith!`,
        testFunctionB: `$ bash ~/"Some Bash Script B.sh"
Hello, Jane Smith!`,
        aptInstall: `#!/bin/bash

aptInstall curl`,
        cpFile_Folder_ZipData: `#!/bin/bash

cpFile ~/"Test File.txt" ~/"New File/Copy File.txt"
cpFolder ~/"Test Directory" ~/"New Directory/Copy Directory"
cpZipData ~/"Test Data.zip" ~/"New Data/Copy Data"`,
        changePermission_Timestamp: `#!/bin/bash

changeDefaultPermission ~/"Test Directory A"
changeMasterPermission ~/"Test Directory B"
changeTimestamp ~/"Test Directory C" "1970/01/01 00:00:00"`,
        inputData: `#!/bin/bash

file=$(inputData "ファイル")`,
        selectOption: `#!/bin/bash

myOption=(
    "'Option A'"
    "'Option B'"
    "'Option C'"
)

selectOption "\${myOption[*]}"

option=$?

if [ $option = 0 ]; then
    exit
fi

case "$option" in
    1 )
        echo "Select Option A";;
    2 )
        echo "Select Option B";;
    3 )
        echo "Select Option C";;
esac`,
        confirmExecution: `#!/bin/bash

confirmExecution

confirm=$?

if [ $confirm = 0 ]; then
    exit
fi

echo "Running..."`,
    };

    const file = {
        testFunctionA: `#!/bin/bash

function testFunction() {
    echo "Hello, $1!"
}

testFunction "John Smith"`,
        testFunctionB: `#!/bin/bash

source ~/"Some Bash Script A.sh"

testFunction "Jane Smith"`,
        aptInstall: `#!/bin/bash

function aptInstall() {
    sudo apt -y install "$1"
}`,
        cpFile_Folder_ZipData: `#!/bin/bash

function cpFile() {
    if [ -d "$2" ]; then
        rm -f "$2"
    else
        mkdir -p "$(dirname "$2")"
    fi

    cp -fp "$1" "$2"
}

function cpFolder() {
    if [ -d "$2" ]; then
        rm -rf "$2"/*
    else
        mkdir -p "$2"
    fi

    cp -RTfp "$1"/ "$2"
}

function cpZipData() {
    if [ -d "$2" ]; then
        rm -rf "$2"/*
    else
        mkdir -p "$2"
    fi

    unzip "$1" -d "$2"
}`,
        changePermission_Timestamp: `#!/bin/bash

function changeDefaultPermission() {
    find "$1" -name '*' -print0 | xargs -0 -i chmod 755 {}
}

function changeMasterPermission() {
    find "$1" -name '*' -print0 | xargs -0 -i chmod 777 {}
}

function changeTimestamp() {
    find "$1" -name '*' -print0 | xargs -0 -i touch -c -d "$2" {}
}`,
        inputData: `#!/bin/bash

function inputData() {
    # set +x

    local data

    echo -e "\\e[33;1m$1を入力してください: \\e[m" 1>&2
    read -p "" data

    echo "$data"

    # set -x
}`,
        selectOption: `#!/bin/bash

function selectOption() {
    # set +x

    local option
    local select

    eval option=($1)

    echo -e "\\e[33;1m-Option-------------------------------------------------------------------------\\e[m"

    local i=1

    for item in "\${option[@]}"; do
        echo -e "\\e[33;1m- [\${i}] \${item}\\e[m"

        echo $((i++)) >& /dev/null
    done

    echo -e "\\e[33;1m- [*] キャンセル\e[m"
    echo -e "\\e[33;1m--------------------------------------------------------------------------------\\e[m"
    echo -e "\\e[33;1mオプションを選択してください: \\e[m"
    read -p "" select

    if [[ $select =~ ^([0-9]{1,2})|([0-1][0-9]{2})|(2[0-4][0-9])|(25[0-9])$ ]]; then # 0 - 255
        # set -x

        return $((select))
    else
        # set -x

        return 0
    fi
}`,
        confirmExecution: `#!/bin/bash

function confirmExecution() {
    # set +x

    local confirm

    echo -e "\\e[33;1m本当に実行しますか？ (\\"Yes\\"で実行): \\e[m"
    read -p "" confirm

    case "$confirm" in
        Yes|yes )
            echo -e "\\e[32;1m処理を開始します\\e[m"

            # set -x

            return 1;;
        * )
            echo -e "\\e[31;1m処理を中止します\\e[m"

            # set -x

            return 0;;
    esac
}`,
    };

    return (
        <>
            <Head>
                <title>Utility - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Utility</h1>

                    <p>
                        Bashを効率的に動かしたり可読性を高めるには、幾つかの機能を関数として纏めるべきでしょう。
                    </p>

                    <h2>関数</h2>

                    <p>
                        関数は以下のように記述します。また、ファイルは以下のように実行します。
                    </p>

                    <div class='content'>
                        <Code title='~/Some Bash Script A.sh' content={file.testFunctionA} />
                    </div>

                    <div class='content'>
                        <Code title='Bash' content={sample.testFunctionA} />
                    </div>

                    <ul>
                        <li>Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（<code>#!/bin/bash</code>）を書くことで機能を明示します。</li>
                        <li>文字列に空白（<code> </code>）が含まれる場合は空白をエスケープ（<code>\ </code>）するか、引用符（<code>"</code>）で囲む必要があります。</li>
                    </ul>

                    <p>
                        他のファイルに記述された関数を使用する場合は、<code>source</code>コマンドでスクリプトを呼び出します。ただし、先程の状態では<code>testFunction "John Smith"</code>が実行されてしまうので、関数用のファイルには関数だけを記述しましょう。
                    </p>

                    <div class='content'>
                        <Code title='~/Some Bash Script B.sh' content={file.testFunctionB} />
                    </div>

                    <div class='content'>
                        <Code title='Bash' content={sample.testFunctionB} />
                    </div>

                    <h2>Install Advanced Packaging Tool</h2>

                    <p>
                        コンピューターのセットアップでは多くのパッケージをインストールすると思います。それを何度も繰り返す場合は、操作をファイルに纏めたり、その操作すらも関数に纏めます。
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.aptInstall} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.aptInstall} />
                    </div>

                    <h2>Copy File / Folder / Zip Data</h2>

                    <p>
                        ファイルやフォルダーを複製したり圧縮ファイルを展開する場合、指定されたディレクトリーが存在しなければ成功しません。それを回避するため、自動的にディレクトリーを作成します。
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.cpFile_Folder_ZipData} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.cpFile_Folder_ZipData} />
                    </div>

                    <ul>
                        <li>複製先にファイルやディレクトリーが存在する場合に対象を削除している（＝複製先を置換している）ため、それを望まない場合は関数内の<code>rm</code>コマンドを削除する必要があります。</li>
                    </ul>

                    <h2>Change Permission / Timestamp</h2>

                    <p>
                        権限や更新日時を一括で変更したいですか？　<code>find</code>コマンドと<code>xargs</code>コマンドを駆使しましょう！
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.changePermission_Timestamp} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.changePermission_Timestamp} />
                    </div>

                    <ul>
                        <li><code>xargs</code>コマンドは改行や空白を区切りとして処理するため、パスに空白が含まれると正常に動作しません。それを解決するため、<code>find</code>コマンドでは<code>-print0</code>オプションを付与することで一覧の区切りをNULL文字（<code>/0</code>）で記述します。また、<code>xargs</code>コマンドでは<code>-0</code>オプションを付与することでNULL文字を区切りとして処理します。</li>
                    </ul>

                    <h2>Input Data</h2>

                    <p>
                        スクリプトで対話（ユーザーが入力した文字列を変数に出力）する処理は煩雑なので、一行で実現できるように工夫します。
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.inputData} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.inputData} />
                    </div>

                    <ul>
                        <li>関数内で変数を定義する場合は基本的に<code>local</code>コマンドの使用が推奨されます。</li>
                        <li>関数は返り値として<code>echo</code>コマンドの内容を出力するため、インターフェースのみに出力する場合は<code>echo</code>コマンドの結果を標準エラー（<code>1&gt;&2</code>）で出力する必要があります。</li>
                    </ul>

                    <h2>Select Option</h2>

                    <p>
                        対話では選択肢を入出力する状況も想定されます。エラーやミスを防ぐ手段として機能の共通化は最も効果的です。
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.selectOption} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.selectOption} />
                    </div>

                    <ul>
                        <li>空白を含む文字列の配列は扱いが難しいため、以下の処理で関数に入力します。</li>
                        <ol>
                            <li>配列の各値を二重の引用符（<code>"'文字列'"</code>）で囲みます。</li>
                            <li>関数の引数として配列を入力する際に、配列全体を配列として参照（<code>{'array[@]'}</code>）せずに文字列として参照（<code>{'array[*]'}</code>）します。</li>
                            <li><code>eval</code>コマンドで文字列を評価（内容を展開して配列に変換）します。</li>
                            <li>必要に応じて配列全体を配列として参照します。ただし、空白を扱うために変数を引用符で囲みます。</li>
                        </ol>
                        <li><code>{'\\e[XX;XXm文字列\\e[XX;XXm'}</code>はANSIエスケープシーケンスです。</li>
                        <li>数値の演算を行う場合は<code>{'echo $((変数の演算)) >& /dev/null'}</code>で出力結果を虚無に放り込みます。</li>
                        <li>関数が<code>return</code>で戻り値を出力する場合の制約として、終了ステータス：8ビットの数値（0 - 255）しか出力できないことに注意してください。また、その場合は<code>$?</code>で終了ステータスを取得します。</li>
                    </ul>

                    <h2>Confirm Execution</h2>

                    <p>
                        人間は何かしらのミスを犯します。入力した情報を確認してから処理を実行しましょう。
                    </p>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={file.confirmExecution} />
                    </div>

                    <div class='content'>
                        <Code title='Some Bash Script.sh' content={sample.confirmExecution} />
                    </div>
                </>
            </Board>
        </>
    );
}
