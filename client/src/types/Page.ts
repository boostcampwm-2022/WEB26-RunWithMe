import React from "react";

export interface Page {
    lazy: React.LazyExoticComponent<() => JSX.Element>;
    preLoad: () => Promise<object>;
}
