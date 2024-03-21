import { JSX } from 'preact/jsx-runtime';
import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import getDeviceInfo from '../../Utility/Info/getDeviceInfo.tsx';
import getTimeInfo from '../../Utility/Info/getTimeInfo.tsx';
import Link from '../../../components/Common/Link.tsx';

export default function Info(): JSX.Element {
    const timeInfo = useSignal(getTimeInfo());
    const deviceInfo = getDeviceInfo();

    let intervalId: number;

    useEffect(() => {
        if (!intervalId) intervalId = setInterval(() => (timeInfo.value = getTimeInfo()), 10);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <p>
            {`${timeInfo.value.date} ${timeInfo.value.time} ${timeInfo.value.timeZone}`}
            <br />
            {`Type: ${deviceInfo.type} | System: ${deviceInfo.system} | Browser: ${deviceInfo.browser}`}
            {' ... '}
            <Link href='/info'>More</Link>
        </p>
    );
}
