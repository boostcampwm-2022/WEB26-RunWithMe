import { MutableRefObject, useCallback } from "react";

const useZoomControl = (map: MutableRefObject<kakao.maps.Map | undefined>) => {
    const zoomIn = useCallback(() => {
        if (!map.current) return;
        map.current.setLevel(map.current.getLevel() - 1, { animate: true });
    }, []);

    const zoomOut = useCallback(() => {
        if (!map.current) return;
        map.current.setLevel(map.current.getLevel() + 1, { animate: true });
    }, []);
    return { zoomIn, zoomOut };
};

export default useZoomControl;
