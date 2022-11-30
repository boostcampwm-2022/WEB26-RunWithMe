import { useState } from "react";
import { FilterOption } from "#types/FilterOption";
const useFilter = (initialFilterState: FilterOption): [FilterOption, (selectedFilter: FilterOption) => void] => {
    const [filterState, setFilterState] = useState<FilterOption>(initialFilterState);
    const setCurrentFilterState = (selectedFilter: FilterOption) => {
        setFilterState(selectedFilter);
    };

    return [filterState, setCurrentFilterState];
};

export default useFilter;
