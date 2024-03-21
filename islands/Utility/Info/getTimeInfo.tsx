import alignDigit from '../alignDigit.tsx';

export type getTimeInfoRes = {
    date: string;
    time: string;
    timeZone: string;
};

export default function getTimeInfo(): getTimeInfoRes {
    const now = new Date();

    const option = (digit: number) => {
        return {
            intDigit: digit,
            decDigit: 0,
        };
    };

    const year = alignDigit(now.getFullYear(), option(4));
    const month = alignDigit(now.getMonth() + 1, option(2));
    const date = alignDigit(now.getDate(), option(2));
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].splice(now.getDay(), 1);
    const hours = alignDigit(now.getHours(), option(2));
    const minutes = alignDigit(now.getMinutes(), option(2));
    const seconds = alignDigit(now.getSeconds(), option(2));

    const timeZoneOffset = alignDigit((now.getTimezoneOffset() / 60) * -100, {
        intDigit: 5,
        decDigit: 0,
        forcePositiveSymbol: true,
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        date: `${year}/${month}/${date} (${day})`,
        time: `${hours}:${minutes}:${seconds}`,
        timeZone: `GMT${timeZoneOffset} (${timeZone})`,
    };
}
