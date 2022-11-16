import useMap from "#hooks/useMap";
import { LatLng } from "#types/LatLng";

interface ViewMapProps {
    height?: string;
    path?: LatLng[];
}

const ViewMap = ({ height = "50vh" }: ViewMapProps) => {
    const { renderMap } = useMap({ height, center: { lat: 33.450701, lng: 126.570667 } });
    return renderMap();
};

export default ViewMap;
