import { JSX } from 'preact/jsx-runtime';

type linkProps = {
    href?: string;
    style?: JSX.CSSProperties;
    children?: JSX.Element | string;
};

export default function Link({ href, style, children }: linkProps): JSX.Element {
    const isExternalLink = (text: string): boolean => ['https://', 'http://', 'mailto:', 'tel:'].filter((word) => text.startsWith(word)).length > 0;

    const isExternalLinkItem = href && isExternalLink(href);
    const isExternalTextItem = typeof children === 'string' && isExternalLink(children);

    const linkItem = href || (isExternalTextItem ? children : undefined);
    const contentItem = children || href || undefined;

    if (linkItem && contentItem) {
        if (isExternalLinkItem || isExternalTextItem) {
            return (
                <a style={style} href={linkItem} target='_blank' rel='noreferrer'>
                    {contentItem}
                </a>
            );
        } else {
            return (
                <a style={style} href={linkItem}>
                    {contentItem}
                </a>
            );
        }
    } else {
        return <s style={style}>{contentItem}</s>;
    }
}
