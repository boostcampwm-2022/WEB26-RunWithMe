import { throttle } from "#utils/timerUtils";
import { Dispatch, MutableRefObject, RefObject, useCallback } from "react";

interface UseDrawCruveProps {
    container: RefObject<HTMLDivElement>;
    map: MutableRefObject<kakao.maps.Map | undefined>;
    setPath: Dispatch<React.SetStateAction<(kakao.maps.LatLng | kakao.maps.LatLng[])[]>>;
}

const useDrawCurve = ({ container, map, setPath }: UseDrawCruveProps) => {
    const coordsFromContainerPoint = useCallback(
        ({ map, x, y }: { map: kakao.maps.Map; x: number; y: number }) => {
            const point = new kakao.maps.Point(x - (container.current?.getBoundingClientRect().x || 0), y - 57);
            return map.getProjection().coordsFromContainerPoint(point);
        },
        [map, container.current],
    );

    const touchMoveEventHandler = useCallback(() => {
        setPath((prev) => [...prev, []]);
        container.current?.addEventListener("touchmove", cursorMoveHandler);
        container.current?.addEventListener("touchend", touchEndEventHandler);
    }, [container]);

    const cursorMoveHandler = useCallback(
        throttle((e: MouseEvent | TouchEvent) => {
            if (!map.current) return;
            const { clientX: x, clientY: y } = e instanceof MouseEvent ? e : e.touches[0];
            const _map = map.current;
            setPath((prev) => {
                const line = prev.at(-1) as kakao.maps.LatLng[];
                return [...prev.slice(0, -1), [...line, coordsFromContainerPoint({ map: _map, x, y })]];
            });
        }, 10),
        [map],
    );

    const touchEndEventHandler = useCallback(() => {
        container.current?.removeEventListener("touchmove", cursorMoveHandler);
        container.current?.removeEventListener("touchend", touchEndEventHandler);
    }, [container, cursorMoveHandler, touchMoveEventHandler]);

    const mouseUpEventHandler = useCallback(() => {
        container.current?.removeEventListener("mousemove", cursorMoveHandler);
        container.current?.removeEventListener("mouseup", mouseUpEventHandler);
    }, [container]);

    const mouseMoveEventHandler = useCallback(() => {
        setPath((prev) => [...prev, []]);
        container.current?.addEventListener("mousemove", cursorMoveHandler);
        container.current?.addEventListener("mouseup", mouseUpEventHandler);
    }, [container]);

    const setDrawCurveEnabled = useCallback(
        (enabled: boolean) => {
            if (!container.current) return;
            if (enabled) {
                container.current.removeEventListener("touchstart", touchMoveEventHandler);
                container.current.removeEventListener("mousedown", mouseMoveEventHandler);
            } else {
                container.current.addEventListener("touchstart", touchMoveEventHandler);
                container.current.addEventListener("mousedown", mouseMoveEventHandler);
            }
        },
        [container, touchEndEventHandler, mouseMoveEventHandler],
    );
    return { setDrawCurveEnabled };
};

export default useDrawCurve;
