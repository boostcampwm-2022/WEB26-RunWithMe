import path from "path";

module.exports = {
    webpack: {
        alias: {
            "#pages": path.resolve(__dirname, "src/pages"),
            "#components": path.resolve(__dirname, "src/components"),
            "#hooks": path.resolve(__dirname, "src/hooks"),
            "#utils": path.resolve(__dirname, "src/utils"),
            "#assets": path.resolve(__dirname, "src/assets"),
            "#constants": path.resolve(__dirname, "src/constants"),
            "#types": path.resolve(__dirname, "src/types"),
            "styles/*": path.resolve(__dirname, "src/styles"),
        },
    },
};
