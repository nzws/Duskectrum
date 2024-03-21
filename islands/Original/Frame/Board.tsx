import { JSX } from 'preact/jsx-runtime';
import Frame from '../Frame/Frame.tsx';
import { getDeviceType } from '../../Utility/Info/getDeviceInfo.tsx';
import Info from '../Info/Info.tsx';
import Main from '../../../components/Original/Frame/Main.tsx';
import Menu from '../Menu/Menu.tsx';

type mainProps = {
    type?: string;
    className?: string;
    children?: JSX.Element;
};

const SingleBoard = ({ className, children }: mainProps): JSX.Element => {
    return (
        <Main>
            <Frame title='Content' frameStyle='box' width='100%' height='100%' frameType={['setHide']} className={className}>
                {children}
            </Frame>
        </Main>
    );
};

const CommonBoard = ({ className, children }: mainProps): JSX.Element => {
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

        return (
            <Main style={mainStyle}>
                <>
                    <Frame title='Info' frameStyle='box' frameType={['setHide']} className='document'>
                        <Info />
                    </Frame>
                    <Frame title='Content' frameStyle='box' frameType={['setMaximize', 'setHide']} className={className}>
                        {children}
                    </Frame>
                    <Frame title='Menu' frameStyle='box' frameType={['setMaximize', 'setHide']}>
                        <Menu />
                    </Frame>
                </>
            </Main>
        );
    }
};

export default function Board({ type, className, children }: mainProps): JSX.Element {
    switch (type) {
        case 'single':
            return <SingleBoard className={className}>{children}</SingleBoard>;
        case 'common':
            return <CommonBoard className={className}>{children}</CommonBoard>;
        default:
            return <SingleBoard className={className}>{children}</SingleBoard>;
    }
}
