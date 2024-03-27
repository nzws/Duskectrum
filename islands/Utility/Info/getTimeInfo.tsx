import getTimeDisplay, { getTimeDisplayRes } from '../getTimeDisplay.tsx';

export type getTimeInfoRes = getTimeDisplayRes;

export default function getTimeInfo(): getTimeInfoRes {
    return getTimeDisplay(new Date());
}
