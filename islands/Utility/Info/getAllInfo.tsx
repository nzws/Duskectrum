import getDeviceInfo, { getDeviceInfoRes } from './getDeviceInfo.tsx';
import getPlaceInfo, { getPlaceInfoRes } from './getPlaceInfo.tsx';
import getTimeInfo, { getTimeInfoRes } from './getTimeInfo.tsx';

export type getAllInfoRec = {
    prevRes?: getAllInfoRes;
    geolocationPosition?: GeolocationPosition | null;
};

export type getAllInfoRes = {
    time: getTimeInfoRes;
    device: getDeviceInfoRes;
    place: getPlaceInfoRes | null;
};

export const getAllInfo = (rec: getAllInfoRec): getAllInfoRes => {
    const timeInfo = getTimeInfo();
    const deviceInfo = getDeviceInfo();
    const placeInfo = rec.geolocationPosition ? getPlaceInfo(rec.geolocationPosition) : rec.prevRes ? rec.prevRes.place : null;

    return {
        time: timeInfo,
        device: deviceInfo,
        place: placeInfo,
    };
};
