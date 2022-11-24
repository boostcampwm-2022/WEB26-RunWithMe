import { useState } from "react";
const useFilter = (initialFilterState: string): [string, (selectedFilter: string) => void] => {
    const [filterState, setFilterState] = useState<string>(initialFilterState);
    /*
        initialFilter object example
        {
            currentFilter : '5km 이내'
            options: ['5km 이내', '3km 이내', '1km 이내']
        }
    */

    const setCurrentFilterState = (selectedFilter: string) => {
        setFilterState(selectedFilter);
    };

    return [filterState, setCurrentFilterState];
};

export default useFilter;
