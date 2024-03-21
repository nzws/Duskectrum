import { JSX } from 'preact/jsx-runtime';
import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { getAllInfo } from '../../Utility/Info/getAllInfo.tsx';
import normalizeVariableName from '../../Utility/normalizeVariableName.tsx';

export default function InfoAdvance(): JSX.Element {
    const info = useSignal(getAllInfo({}));

    let intervalId: number;
    let watchId: number;

    useEffect(() => {
        if (!intervalId) intervalId = setInterval(() => (info.value = getAllInfo({ prevRes: info.value })), 10);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        watchId = navigator.geolocation.watchPosition(
            (rec) => (info.value = getAllInfo({ prevRes: info.value, geolocationPosition: rec })),
            () => (info.value = getAllInfo({ prevRes: info.value })),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const setObjectData = (data: object): JSX.Element => {
        const rec = Object.entries(data);
        const res: JSX.Element[] = [];

        for (const [key, val] of rec) {
            if (typeof val === 'object') {
                if (val !== null) {
                    res.push(
                        <>
                            <li>{normalizeVariableName(key)}:</li>
                            {setObjectData(val)}
                        </>,
                    );
                } else {
                    res.push(
                        <li>
                            {normalizeVariableName(key)}:&nbsp;<span class='gray_tc'>NULL</span>
                        </li>,
                    );
                }
            } else {
                res.push(
                    <li>
                        {normalizeVariableName(key)}:&nbsp;<span class='lime_tc'>{val}</span>
                    </li>,
                );
            }
        }

        return <ul>{res}</ul>;
    };

    return setObjectData(info.value);
}
