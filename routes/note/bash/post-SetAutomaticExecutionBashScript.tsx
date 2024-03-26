import { Head } from '$fresh/runtime.ts';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';
import Link from '../../../components/Common/Link.tsx';

export default function Post() {
    const command = {
        runAtLoginSample: `$ sudo echo "export PATH=\\$PATH:~/\\"My Path\\"" >> ~/.bash_profile`,
        runAtLogin: `$ sudo echo "bash ~/\\"My Command\\"/\\"Run at Login.sh\\"" >> ~/.bash_profile`,
        runAtLogout: `$ sudo echo "bash ~/\\"My Command\\"/\\"Run at Logout.sh\\"" >> ~/.bash_logout`,
        runAtBashStart: `$ sudo echo -e "\\nsource ~/\\"My Command\\"/\\"Run at Bash Start.sh\\"" >> ~/.bashrc`,
    };

    const file = {
        runAtLogin: `#!/bin/bash

export PATH=$PATH:~/"My Path"`,
        runAtLogout: `#!/bin/bash

# Disable Some History (only KDE)

sudo cat /dev/null > ~/.local/share/user-places.xbel
sudo rm -f ~/.local/share/user-places.xbel.bak
sudo rm -f ~/.local/share/user-places.xbel.tbcache

# Disable Command History

history -c
cat /dev/null > ~/.bash_history`,
        runAtBashStart: `#!/bin/bash

alias ll="ls -lhvA --time-style=\\"+%Y/%m/%d %H:%M:%S\\""

function cleanTerminal() {
    history -c
    cat /dev/null > ~/.bash_history
    clear

    unset blankLine

    echo -e "\\e[01;31mThe beginning of something.\\e[00;00m\\n"
}

alias clean="cleanTerminal"

function addBlankLine() {
    if [[ -z "$blankLine" ]]; then
        blankLine=true
    else
        printf "\\n"
    fi
}

PS1="\\[\\e]0\\u@\\h: \\w\\a\\]\${debian_chroot:+($debian_chroot)}\\[\\033[01;33m\\]\\u@\\h\\[\\033[01;00m\\]: \\[\\033[01;32m\\]\\w\\[\\033[00;00m\\] \\$ "
PROMPT_COMMAND="addBlankLine"

clean`,
    };

    return (
        <>
            <Head>
                <title>Set Automatic Execution Bash Script - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Set Automatic Execution Bash Script</h1>

                    <p>
                        Bashには特定の状況で実行されるファイルが存在します。大抵はユーザー単位で用意されています。
                    </p>

                    <table>
                        <thead>
                            <tr>
                                <th>場所</th>
                                <th>ファイル名</th>
                                <th>機能</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan={3}>~/</td>
                                <td>.bash_profile</td>
                                <td>実行するコマンドを記述します：ログイン時に。</td>
                            </tr>
                            <tr>
                                <td>.bash_logout</td>
                                <td>実行するコマンドを記述します：ログアウト時に。</td>
                            </tr>
                            <tr>
                                <td>.bashrc</td>
                                <td>実行するコマンドを記述します：Bashの起動時に。</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>.bash_profile</h2>

                    <p>
                        環境変数を設定する際に便利なファイルです。例えば、<code>echo</code>コマンドと追記リダイレクション（<code>&gt;&gt;</code>）を用いて<code>~/My Path</code>にPATHを通す操作をファイルに追記してみましょう。
                    </p>

                    <div class='content'>
                        <Code title='Bash' content={command.runAtLoginSample} />
                    </div>

                    <ul>
                        <li>定義された変数（シェル変数）はターミナル（シェル）を閉じると消えてしまうため、恒久的に変数を定義したい場合は<code>export</code>コマンドで環境変数に設定します。</li>
                        <li>変数は<code>変数名=内容</code>で定義して<code>$変数名</code>で呼出しますが、PATHは既に内容が定義されているため、上書きではなく書き足す操作として<code>PATH=$PATH:内容</code>を定義します。これは、PATHが複数の内容をコロン（<code>:</code>）で区切るためです。</li>
                        <li>文字列に空白（<code> </code>）が含まれる場合は空白をエスケープ（<code>\ </code>）するか、引用符（<code>"</code>）で囲む必要があります。また、変数として機能しないドル記号や引用符の内部で引用符を記述する場合も同様にエスケープ（<code>\$</code>や<code>\"</code>）する必要があります。</li>
                    </ul>

                    <p>
                        当然ながら他のファイルを呼び出すことも可能なので、可読性や保守性を高めるために個別のファイルを用意しても構いません。
                    </p>

                    <div class='content'>
                        <Code title='Bash' content={command.runAtLogin} />
                    </div>

                    <div class='content'>
                        <Code title='~/My Command/Run at Login.sh' content={file.runAtLogin} />
                    </div>

                    <ul>
                        <li>Bashのコマンドをファイルに記述する際は、1行目にシバン・シェバング（<code>#!/bin/bash</code>）を書くことで機能を明示します。</li>
                    </ul>

                    <h2>.bash_logout</h2>

                    <p>
                        私はコマンドやアクティビティーの履歴を残したくないので、ここで削除を行います。ファイルを削除する場合は<code>rm</code>コマンドを、ファイルの中身を削除する場合は<code>/dev/null</code>（虚無）を対象にリダイレクション（<code>&gt;</code>）します。
                    </p>

                    <div class='content'>
                        <Code title='Bash' content={command.runAtLogout} />
                    </div>

                    <div class='content'>
                        <Code title='~/My Command/Run at Logout.sh' content={file.runAtLogout} />
                    </div>

                    <ul>
                        <li><var>Disable Some History</var>は<Link href='https://kde.org/'>KDE</Link>のアクティビティーを操作する内容であるため、他のデスクトップ環境を使用している場合は専用のコードを記述する必要があります。</li>
                    </ul>

                    <h2>.bashrc</h2>

                    <p>
                        エイリアス（コマンドの略称）を設定する際に便利なファイルです。例えば、長いコマンドを頻繁に入力する場合は<code>alias 略称="コマンド"</code>を設定することで<code>略称</code>から元の<code>コマンド</code>を実行できます。他にも、プロンプト（コマンドの入力箇所に表示される情報）の変更やターミナルの改造が行えます。
                    </p>

                    <div class='content'>
                        <Code title='Bash' content={command.runAtBashStart} />
                    </div>

                    <div class='content'>
                        <Code title='~/My Command/Run at Bash Start.sh' content={file.runAtBashStart} />
                    </div>

                    <ul>
                        <li><code>.bashrc</code>には何かしらのコードが既に記述されている場合が多く、既存の内容と区別するために<code>\n</code>で空行を追加します。</li>
                        <li><code>echo</code>コマンドでは<code>-e</code>オプションを付与することでエスケープシーケンス（改行を表す<code>\n</code>等）を解釈します。</li>
                        <li><code>.bashrc</code>以外のファイルにエイリアスを記述する場合は、<code>bash</code>コマンドではなく<code>source</code>コマンドを使用して実行元の環境（<code>.bashrc</code>、つまりターミナル）にコマンドを展開する必要があります。</li>
                        <li><code>{'\\e[XX;XXm文字列\\e[XX;XXm'}</code>はANSIエスケープシーケンス、<code>{'\\[文字列\\]'}</code>は制御シーケンスを記述するための特殊文字です。</li>
                        <li><code>PS1</code>という変数に文字列を記述することで、プロンプトを変更します。</li>
                        <li><code>PROMPT_COMMAND</code>という変数にコマンドや関数を記述することで、コマンドの処理が終了した後（＝プロンプトが表示される前）に内容を自動で実行します。</li>
                    </ul>
                </>
            </Board>
        </>
    );
}
