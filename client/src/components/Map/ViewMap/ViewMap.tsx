import useMap from "#hooks/useMap";

interface ViewMapProps {
    height?: string;
}

const ViewMap = ({ height = "50vh" }: ViewMapProps) => {
    const { map, renderMap } = useMap({ height, center: { lat: 33.450701, lng: 126.570667 } });
    return renderMap();
};

export default ViewMap;
