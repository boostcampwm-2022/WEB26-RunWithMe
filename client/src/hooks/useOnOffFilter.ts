import { useState } from "react";

const useOnOffFilter = (initialFilterState: boolean): [boolean, () => void] => {
    const [filterState, setFilterState] = useState<boolean>(initialFilterState);
    const toggleFilterState = () => {
        setFilterState(!filterState);
    };

    return [filterState, toggleFilterState];
};

export default useOnOffFilter;
