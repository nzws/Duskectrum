import { JSX } from 'preact/jsx-runtime';
import Frame from '../Original/Frame/Frame.tsx';
import { getFrameHeight } from '../Original/Frame/Frame.tsx';

type codeProps = {
    title?: string;
    line?: number;
    content: string;
};

export default function Code({ title, line, content }: codeProps): JSX.Element {
    const frameWrapStyle: JSX.CSSProperties = {
        height: 'auto',
        maxHeight: `calc(${getFrameHeight()}px + 12pt * 1.5 * ${line || 10})`,
    };

    const frameStyle: JSX.CSSProperties = {
        display: 'flex',
    };

    const lineStyle: JSX.CSSProperties = {
        userSelect: 'none',
        marginRight: 'calc(12pt * 0.5)',
        textAlign: 'right',
    };

    const contentStyle: JSX.CSSProperties = {
        flexGrow: '1',
    };

    const lineNum = content.split('\n').length;

    return (
        <Frame
            title={title || 'Code'}
            frameStyle='card'
            frameType={['setMaximize', 'setHide']}
            style={frameStyle}
            wrapStyle={frameWrapStyle}
            className='document'
        >
            <>
                <div className='gray_tc' style={lineStyle}>
                    <pre>{[...Array(lineNum)].map((_, i) => `${i + 1}:\n`)}</pre>
                </div>
                <div style={contentStyle}>
                    <pre>{content}</pre>
                </div>
            </>
        </Frame>
    );
}
