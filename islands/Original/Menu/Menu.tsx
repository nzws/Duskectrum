import { JSX } from 'preact/jsx-runtime';
import { useSignal } from '@preact/signals';
import Link from '../../../components/Common/Link.tsx';
import { menuData } from '../../../components/Original/Menu/MenuData.tsx';

type menuDataProps = {
    name: string;
    isOpen?: boolean;
    content: string | [menuDataProps];
};

export default function Menu(): JSX.Element {
    const menuStyle: JSX.CSSProperties = {
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        gap: '4px',
    };

    const contentStyle: JSX.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '4px',
    };

    const setItemStyle = (nest: number) => {
        const itemStyle: JSX.CSSProperties = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '4px',
            whiteSpace: 'nowrap',
            textAlign: 'left',
        };

        return Object.assign(itemStyle, {
            marginLeft: `${12 * nest}pt`,
        });
    };

    const setItem = (content: [menuDataProps], nest: number): JSX.Element => {
        return (
            <>
                {content.map((item: menuDataProps) => {
                    if (typeof item.content !== 'object') {
                        return (
                            <li className='myMenuButton' style={setItemStyle(nest)}>
                                <Link href={item.content}>{`- ${item.name}`}</Link>
                            </li>
                        );
                    } else {
                        return setSpreadItem(item.name, item.isOpen, item.content, nest);
                    }
                })}
            </>
        );
    };

    const setSpreadItem = (name: string, isOpen: boolean | undefined, content: [menuDataProps], nest: number): JSX.Element => {
        const spread = useSignal(isOpen ? true : false);

        return (
            <ul style={contentStyle}>
                <li>
                    <button className='myMenuButton' style={setItemStyle(nest)} onClick={() => (spread.value = !spread.value)}>
                        {spread.value ? '|' : '/'} {name}
                    </button>
                </li>
                {spread.value && <ul style={contentStyle}>{setItem(content, nest + 1)}</ul>}
            </ul>
        );
    };

    return <ul style={menuStyle}>{setItem(menuData, 0)}</ul>;
}
