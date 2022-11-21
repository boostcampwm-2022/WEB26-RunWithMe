import { useState, useCallback } from "react";
const useFilter = (initialFilter: any) => {
    const [filterState, setFilterState] = useState(initialFilter);

    /*
        initialFilter object example
        {
            currentFilter : '5km 이내'
            options: ['5km 이내', '3km 이내', '1km 이내']
        }
    */
    return [filterState, setFilterState];
};

export default useFilter;
