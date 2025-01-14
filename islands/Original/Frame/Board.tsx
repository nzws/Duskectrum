import { JSX } from 'preact/jsx-runtime';
import Frame from '../Frame/Frame.tsx';
import { getDeviceType } from '../../Utility/Info/getDeviceInfo.tsx';
import Info from '../Info/Info.tsx';
import Main from '../../../components/Original/Frame/Main.tsx';
import Menu from '../Menu/Menu.tsx';

type mainProps = {
    type?: string;
    className?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element;
};

const SingleBoard = ({ className, style, children }: mainProps): JSX.Element => {
    return (
        <Main>
            <Frame title='Content' frameStyle='box' width='100%' height='100%' frameType={['setHide']} style={style} className={className}>
                {children}
            </Frame>
        </Main>
    );
};

const CommonBoard = ({ className, style, children }: mainProps): JSX.Element => {
    const deviceType = getDeviceType(navigator.userAgent);

    if (deviceType !== 'Mobile') {
        const mainStyle: JSX.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: `minmax(120px, 25%) 1fr`,
            gridTemplateRows: `max-content minmax(0, 1fr)`,
        };

        const infoStyle: JSX.CSSProperties = {
            gridColumn: '1 / 3',
            gridRow: '1 / 2',
        };

        const menuStyle: JSX.CSSProperties = {
            gridColumn: '1 / 2',
            gridRow: '2 / 3',
        };

        const contentStyle: JSX.CSSProperties = {
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
        };

        return (
            <Main style={mainStyle}>
                <>
                    <Frame title='Info' frameStyle='box' wrapStyle={infoStyle} frameType={['setHide']} className='document'>
                        <Info />
                    </Frame>
                    <Frame title='Menu' frameStyle='box' wrapStyle={menuStyle} frameType={['setMinimize', 'setMaximize', 'setHide']}>
                        <Menu />
                    </Frame>
                    <Frame
                        title='Content'
                        frameStyle='box'
                        wrapStyle={contentStyle}
                        frameType={['setMinimize', 'setMaximize', 'setHide']}
                        style={style}
                        className={className}
                    >
                        {children}
                    </Frame>
                </>
            </Main>
        );
    } else {
        const mainStyle: JSX.CSSProperties = {
            display: 'grid',
            gridTemplateColumns: `1fr`,
            gridTemplateRows: `max-content minmax(0, 2fr) minmax(0, 1fr)`,
        };

        const infoStyle: JSX.CSSProperties = {
            gridColumn: 'auto',
            gridRow: '1 / 2',
        };

        const menuStyle: JSX.CSSProperties = {
            gridColumn: 'auto',
            gridRow: '3 / 4',
        };

        const contentStyle: JSX.CSSProperties = {
            gridColumn: 'auto',
            gridRow: '2 / 3',
        };

        return (
            <Main style={mainStyle}>
                <>
                    <Frame title='Info' frameStyle='box' wrapStyle={infoStyle} frameType={['setHide']} className='document'>
                        <Info />
                    </Frame>
                    <Frame title='Menu' frameStyle='box' wrapStyle={menuStyle} frameType={['setMaximize', 'setHide']}>
                        <Menu />
                    </Frame>
                    <Frame title='Content' frameStyle='box' wrapStyle={contentStyle} frameType={['setMaximize', 'setHide']} style={style} className={className}>
                        {children}
                    </Frame>
                </>
            </Main>
        );
    }
};

export default function Board({ type, style, className, children }: mainProps): JSX.Element {
    switch (type) {
        case 'single':
            return (
                <SingleBoard style={style} className={className}>
                    {children}
                </SingleBoard>
            );
        case 'common':
            return (
                <CommonBoard style={style} className={className}>
                    {children}
                </CommonBoard>
            );
        default:
            return (
                <SingleBoard style={style} className={className}>
                    {children}
                </SingleBoard>
            );
    }
}
