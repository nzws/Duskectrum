import { JSX } from 'preact/jsx-runtime';
import { Signal } from '@preact/signals';
import { frameButtonOption, frameOption } from '../../../components/Original/Frame/FrameData.tsx';

export type frameFunctionProps = {
    setMinimize: boolean;
    minimizeFlag: Signal<boolean>;
    setMaximize: boolean;
    maximizeFlag: Signal<boolean>;
    setHide: boolean;
    hideFlag: Signal<boolean>;
    setClose: boolean;
    closeFlag: Signal<boolean>;
};

export const FrameFunction = ({ props }: { props: frameFunctionProps }): JSX.Element => {
    type buttonProps = {
        flag: Signal<boolean>;
        falseSymbol: string;
        trueSymbol: string;
        falseTitle: string;
        trueTitle: string;
    };

    const Button = ({ flag, falseSymbol, trueSymbol, falseTitle, trueTitle }: buttonProps): JSX.Element => {
        const style: JSX.CSSProperties = {
            cursor: 'pointer',
            userSelect: 'none',
            margin: `0 ${frameButtonOption.margin}px`,
            padding: `0 ${frameButtonOption.padding}px`,
            borderTopLeftRadius: `${frameButtonOption.padding / 2}px`,
            borderTopRightRadius: `${frameButtonOption.padding / 2}px`,
            color: frameButtonOption.colorText,
            backgroundColor: frameButtonOption.colorBackground,
        };

        return (
            <div className='myFrameButton' title={!flag.value ? falseTitle : trueTitle} style={style} onClick={() => (flag.value = !flag.value)}>
                {!flag.value ? falseSymbol : trueSymbol}
            </div>
        );
    };

    const style: JSX.CSSProperties = {
        display: 'flex',
        margin: `0 -${frameOption.margin}px 0 ${frameOption.margin}px`,
    };

    return (
        <div style={style}>
            {props.setMinimize && <Button flag={props.minimizeFlag} falseSymbol='.' trueSymbol='!' falseTitle='> Minimize Frame' trueTitle='> Restore Frame' />}
            {props.setMaximize && <Button flag={props.maximizeFlag} falseSymbol='+' trueSymbol='@' falseTitle='> Maximize Frame' trueTitle='> Restore Frame' />}
            {props.setHide && <Button flag={props.hideFlag} falseSymbol='#' trueSymbol='=' falseTitle='> Hide Frame' trueTitle='> Show Frame' />}
            {props.setClose && <Button flag={props.closeFlag} falseSymbol='X' trueSymbol='O' falseTitle='> Close Frame' trueTitle='> Open Frame' />}
        </div>
    );
};
