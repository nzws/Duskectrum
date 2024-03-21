import { type PageProps } from '$fresh/server.ts';

export default function App({ Component }: PageProps) {
    return (
        <html>
            <head>
                <meta charset='utf-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />

                <title>Duskectrum</title>

                <link rel='stylesheet' href='/style/common.css' />

                <link rel='stylesheet' href='/style/components/frame.css' />
                <link rel='stylesheet' href='/style/components/menu.css' />

                <link rel='stylesheet' href='/style/document/heading.css' />
                <link rel='stylesheet' href='/style/document/paragraph.css' />
                <link rel='stylesheet' href='/style/document/text.css' />
                <link rel='stylesheet' href='/style/document/decoration.css' />
                <link rel='stylesheet' href='/style/document/block.css' />
                <link rel='stylesheet' href='/style/document/list.css' />
                <link rel='stylesheet' href='/style/document/table.css' />
                <link rel='stylesheet' href='/style/document/media.css' />
                <link rel='stylesheet' href='/style/document/input.css' />
            </head>

            <body class='w-screen h-screen flex justify-center items-center bg-black text-white'>
                <Component />
            </body>
        </html>
    );
}
