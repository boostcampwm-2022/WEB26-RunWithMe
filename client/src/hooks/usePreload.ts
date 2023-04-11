import { Page } from "#types/Page";
import { useEffect } from "react";

const usePreload = (...pages: Page[]) => {
    useEffect(() => {
        pages.forEach((page) => {
            page.preLoad();
        });
    }, []);
};

export default usePreload;
