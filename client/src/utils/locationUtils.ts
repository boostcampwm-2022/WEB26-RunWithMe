import { JEJU } from "#constants/location";
import { Address } from "#types/Address";
import { LatLng } from "#types/LatLng";

export const isEupMyeonDong = (local: Address) => local.address_type === "REGION" && local.address.region_3depth_h_name;

export const getCurrentLatLng = (): Promise<LatLng> =>
    new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            () => resolve(JEJU),
        );
    });
