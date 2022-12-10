import { LatLng } from "#types/LatLng";
import { getCurrentLatLng } from "#utils/locationUtils";
import { useQuery } from "@tanstack/react-query";

const useGeoLocationQuery = () => {
    return useQuery<LatLng>(["getLocation"], async () => getCurrentLatLng(), { refetchInterval: 60 * 1000 });
};
export default useGeoLocationQuery;
