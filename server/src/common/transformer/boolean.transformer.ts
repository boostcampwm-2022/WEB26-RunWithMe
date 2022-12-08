import { ValueTransformer } from "typeorm";

export class BooleanTransformer implements ValueTransformer {
    public from(value?: number | null): boolean | undefined {
        if (typeof value === "undefined" || value == null) {
            return;
        }
        return value ? true : false;
    }

    public to(value?: boolean | null): number | undefined {
        if (typeof value === "undefined" || value == null) {
            return;
        }
        return value ? 1 : 0;
    }
}
