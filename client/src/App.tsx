import React from "react";
import useMap from "#hooks/useMap";

function App() {
    const { map, renderMap } = useMap({ height: "500px", center: { lat: 33.45, lng: 126.57 } });
    return (
        <div className="App">
            hello boostcamp?
            {renderMap()}
        </div>
    );
}

export default App;
