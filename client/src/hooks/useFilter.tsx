import { useState } from "react";
const useFilter = (initialFilter: {
    currentFilter: string;
    options: string[];
}): [{ currentFilter: string; options: string[] }, (selectedFilter: string) => void] => {
    const [filterState, setFilterState] = useState<{ currentFilter: string; options: string[] }>(initialFilter);
    /*
        initialFilter object example
        {
            currentFilter : '5km 이내'
            options: ['5km 이내', '3km 이내', '1km 이내']
        }
    */

    const setCurrentFilterState = (selectedFilter: string) => {
        console.log("filter set");
        setFilterState({ currentFilter: selectedFilter, options: filterState.options });
    };

    return [filterState, setCurrentFilterState];
};

export default useFilter;
