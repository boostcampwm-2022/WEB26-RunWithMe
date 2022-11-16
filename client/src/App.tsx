import React from "react";
import useMap from "#hooks/useMap";

function App() {
    const { map, renderMap } = useMap({ width: "500px", height: "500px", center: { lat: 33.45, lng: 126.57 } });
    return (
        <div className="App">
            hello boostcamp?
            {renderMap()}
        </div>
    );
}

export default App;
