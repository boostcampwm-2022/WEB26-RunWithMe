import path from "path";

module.exports = {
    webpack: {
        alias: {
            "#components": path.resolve("./src/components"),
            "#hooks": path.resolve("./src/hooks"),
        },
    },
};
