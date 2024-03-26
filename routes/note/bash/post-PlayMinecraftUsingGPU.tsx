import { Head } from '$fresh/runtime.ts';
import { JSX } from 'preact/jsx-runtime';
import Board from '../../../islands/Original/Frame/Board.tsx';
import Code from '../../../islands/Common/Code.tsx';
import Link from '../../../components/Common/Link.tsx';

export default function Post() {
    const command = {
        installGraphicDriver: `$ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
$ sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
$ wget https://developer.download.nvidia.com/compute/cuda/12.3.2/local_installers/cuda-repo-ubuntu2204-12-3-local_12.3.2-545.23.08-1_amd64.deb
$ sudo dpkg -i cuda-repo-ubuntu2204-12-3-local_12.3.2-545.23.08-1_amd64.deb
$ sudo cp /var/cuda-repo-ubuntu2204-12-3-local/cuda-*-keyring.gpg /usr/share/keyrings/
$ sudo apt-get -y update
$ sudo apt-get -y install cuda-toolkit-12-3
$ sudo apt-get -y install cuda-drivers
$ sudo apt-get -y install nvidia-kernel-open-545
$ sudo apt-get -y install cuda-drivers-545`,
        runGPU: `$ cd /usr/local/bin
$ sudo touch runGPU
$ sudo chmod 755 runGPU
$ sudo chown $USER runGPU
$ vi runGPU`,
    };

    const file = {
        runGPU: `#!/bin/bash

export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export __VK_LAYER_NV_optimus=NVIDIA_only
export VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/nvidia_icd.json

exec "$@"`,
    };

    const imageStyle: JSX.CSSProperties = {
        width: '640px',
        height: '360px',
    };

    return (
        <>
            <Head>
                <title>Play Minecraft Using GPU - Duskectrum</title>
            </Head>

            <Board type='common' className='document'>
                <>
                    <h1>Play Minecraft Using GPU</h1>

                    <p>
                        LinuxでもMinecraftをプレイすることができます！
                    </p>

                    <ol>
                        <li><Link href='https://www.minecraft.net/en-us/download'>Minecraftの公式サイト</Link>から<code>Minecraft.deb</code>をダウンロードします。</li>
                        <li>ファイルを実行するか、ターミナルで<code>sudo apt install ~/Download/Minecraft.deb</code>を実行してパッケージをインストールします。</li>
                        <li>アプリケーションを実行するか、ターミナルで<code>minecraft-launcher</code>を実行してMinecraftを起動します。</li>
                        <li>プレイ！</li>
                    </ol>

                    <p>
                        しかし、通常はMinecraftがCPUを使用します。
                    </p>

                    <figure>
                        <div class='gallery justify-center'>
                            <img style={imageStyle} src="/post-PlayMinecraftUsingGPU/0001.png" />
                        </div>
                    </figure>

                    <p>
                        GPUを使用するためには、幾つかの操作が必要になります。今回は、以下の環境で実現する方法を紹介します。
                    </p>

                    <table>
                        <thead>
                            <tr>
                                <th>項目</th>
                                <th>情報</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CPU</td>
                                <td>Intel® Core™ i9-11900H</td>
                            </tr>
                            <tr>
                                <td>GPU</td>
                                <td>NVIDIA® GeForce RTX™ 3050 Ti</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>16 GB</td>
                            </tr>
                            <tr>
                                <td>OPS</td>
                                <td>Ubuntu Studio 22.04</td>
                            </tr>
                        </tbody>
                    </table>

                    <ol>
                        <li><Link href='https://developer.nvidia.com/cuda-downloads'>CUDA Toolkit Downloads</Link>から環境に適合した方法でドライバーをインストールします。</li>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.installGraphicDriver} />
                    </div>

                    <p>
                        ※これは私が2024年02月に使用したコマンドです。
                    </p>

                    <ol>
                        <li value={2}>再起動します。</li>
                        <li>アプリケーションをGPU（dGPU）で起動するためのスクリプトを作成します。ファイルの名前は自由ですが、PATHが通る場所に設置しましょう。</li>
                    </ol>

                    <div class='content'>
                        <Code title='Bash' content={command.runGPU} />
                    </div>

                    <div class='content'>
                        <Code title='/usr/local/bin/runGPU' content={file.runGPU} />
                    </div>

                    <ol>
                        <li value={4}>ターミナルで<code>runGPU minecraft-launcher</code>を実行してMinecraftを起動します。</li>
                        <li>プレイ！</li>
                    </ol>

                    <p>
                        これで、無事にMinecraftをGPUで動かすことができました！
                    </p>

                    <figure>
                        <div class='gallery justify-center'>
                            <img style={imageStyle} src="/post-PlayMinecraftUsingGPU/0002.png" />
                        </div>
                    </figure>
                </>
            </Board>
        </>
    );
}
