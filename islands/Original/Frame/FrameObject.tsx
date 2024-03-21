import { JSX } from 'preact/jsx-runtime';
import { frameOption } from '../../../components/Original/Frame/FrameData.tsx';

export type frameObjectProps = {
    gridStart: JSX.Element;
    gridEnd: JSX.Element;
};

const FrameLine = ({ pos }: { pos: string }): JSX.Element => {
    const style: JSX.CSSProperties = {
        content: '',
        width: 'tb'.includes(pos) ? '100%' : `${frameOption.border}px`,
        height: 'lr'.includes(pos) ? '100%' : `${frameOption.border}px`,
    };

    switch (pos) {
        case 't':
            Object.assign(style, {
                marginTop: `${frameOption.margin}px`,
                marginBottom: `${frameOption.padding}px`,
                background: `linear-gradient(to right, ${frameOption.colorTopLeft}, ${frameOption.colorTopRight})`,
            });
            break;
        case 'b':
            Object.assign(style, {
                marginTop: `${frameOption.padding}px`,
                marginBottom: `${frameOption.margin}px`,
                background: `linear-gradient(to right, ${frameOption.colorBottomLeft}, ${frameOption.colorBottomRight})`,
            });
            break;
        case 'l':
            Object.assign(style, {
                marginLeft: `${frameOption.margin}px`,
                marginRight: `${frameOption.padding}px`,
                background: `linear-gradient(${frameOption.colorTopLeft}, ${frameOption.colorBottomLeft})`,
            });
            break;
        case 'r':
            Object.assign(style, {
                marginLeft: `${frameOption.padding}px`,
                marginRight: `${frameOption.margin}px`,
                background: `linear-gradient(${frameOption.colorTopRight}, ${frameOption.colorBottomRight})`,
            });
            break;
    }

    return <div style={style}></div>;
};

const FrameCardCorner = ({ pos }: { pos: string }): JSX.Element => {
    const style: JSX.CSSProperties = {
        content: '',
        width: `${frameOption.padding / 2 + frameOption.border}px`,
        height: `${frameOption.padding / 2 + frameOption.border}px`,
    };

    {
        if (pos[0] === 't') {
            Object.assign(style, {
                bottom: '0',
                marginBottom: `${frameOption.padding / 2}px`,
            });
        }

        if (pos[0] === 'b') {
            Object.assign(style, {
                top: '0',
                marginTop: `${frameOption.padding / 2}px`,
            });
        }

        if (pos[1] === 'l') {
            Object.assign(style, {
                right: '0',
                marginRight: `${frameOption.padding / 2}px`,
            });
        }

        if (pos[1] === 'r') {
            Object.assign(style, {
                left: '0',
                marginLeft: `${frameOption.padding / 2}px`,
            });
        }
    }

    switch (pos) {
        case 'tl':
            Object.assign(style, {
                borderTopLeftRadius: `${frameOption.padding / 2}px`,
                borderTop: `solid ${frameOption.border}px ${frameOption.colorTopLeft}`,
                borderLeft: `solid ${frameOption.border}px ${frameOption.colorTopLeft}`,
            });
            break;
        case 'tr':
            Object.assign(style, {
                borderTopRightRadius: `${frameOption.padding / 2}px`,
                borderTop: `solid ${frameOption.border}px ${frameOption.colorTopRight}`,
                borderRight: `solid ${frameOption.border}px ${frameOption.colorTopRight}`,
            });
            break;
        case 'bl':
            Object.assign(style, {
                borderBottomLeftRadius: `${frameOption.padding / 2}px`,
                borderBottom: `solid ${frameOption.border}px ${frameOption.colorBottomLeft}`,
                borderLeft: `solid ${frameOption.border}px ${frameOption.colorBottomLeft}`,
            });
            break;
        case 'br':
            Object.assign(style, {
                borderBottomRightRadius: `${frameOption.padding / 2}px`,
                borderBottom: `solid ${frameOption.border}px ${frameOption.colorBottomRight}`,
                borderRight: `solid ${frameOption.border}px ${frameOption.colorBottomRight}`,
            });
            break;
    }

    return (
        <div class='relative'>
            <span class='absolute' style={style}></span>
        </div>
    );
};

export const FrameCard = (): frameObjectProps => {
    return {
        gridStart: (
            <>
                <FrameCardCorner pos='tl' />
                <FrameLine pos='t' />
                <FrameCardCorner pos='tr' />
                <FrameLine pos='l' />
            </>
        ),
        gridEnd: (
            <>
                <FrameLine pos='r' />
                <FrameCardCorner pos='bl' />
                <FrameLine pos='b' />
                <FrameCardCorner pos='br' />
            </>
        ),
    };
};

const FrameBoxCorner = ({ pos }: { pos: string }): JSX.Element => {
    const horizonStyle: JSX.CSSProperties = {
        content: '',
        top: pos[0] === 't' ? `${frameOption.margin}px` : `${frameOption.padding}px`,
        bottom: pos[0] === 't' ? `${frameOption.padding}px` : `${frameOption.margin}px`,
        left: pos[1] === 'l' ? '0' : `${frameOption.padding / 2}px`,
        right: pos[1] === 'l' ? `${frameOption.padding / 2}px` : '0',
    };

    const verticalStyle: JSX.CSSProperties = {
        content: '',
        top: pos[0] === 't' ? '0' : `${frameOption.padding / 2}px`,
        bottom: pos[0] === 't' ? `${frameOption.padding / 2}px` : '0',
        left: pos[1] === 'l' ? `${frameOption.margin}px` : `${frameOption.padding}px`,
        right: pos[1] === 'l' ? `${frameOption.padding}px` : `${frameOption.margin}px`,
    };

    switch (pos) {
        case 'tl':
            Object.assign(horizonStyle, {
                backgroundColor: frameOption.colorTopLeft,
            });
            Object.assign(verticalStyle, {
                backgroundColor: frameOption.colorTopLeft,
            });
            break;
        case 'tr':
            Object.assign(horizonStyle, {
                backgroundColor: frameOption.colorTopRight,
            });
            Object.assign(verticalStyle, {
                backgroundColor: frameOption.colorTopRight,
            });
            break;
        case 'bl':
            Object.assign(horizonStyle, {
                backgroundColor: frameOption.colorBottomLeft,
            });
            Object.assign(verticalStyle, {
                backgroundColor: frameOption.colorBottomLeft,
            });
            break;
        case 'br':
            Object.assign(horizonStyle, {
                backgroundColor: frameOption.colorBottomRight,
            });
            Object.assign(verticalStyle, {
                backgroundColor: frameOption.colorBottomRight,
            });
            break;
    }

    return (
        <div class='relative'>
            <span class='absolute' style={horizonStyle}></span>
            <span class='absolute' style={verticalStyle}></span>
        </div>
    );
};

export const FrameBox = (): frameObjectProps => {
    return {
        gridStart: (
            <>
                <FrameBoxCorner pos='tl' />
                <FrameLine pos='t' />
                <FrameBoxCorner pos='tr' />
                <FrameLine pos='l' />
            </>
        ),
        gridEnd: (
            <>
                <FrameLine pos='r' />
                <FrameBoxCorner pos='bl' />
                <FrameLine pos='b' />
                <FrameBoxCorner pos='br' />
            </>
        ),
    };
};
