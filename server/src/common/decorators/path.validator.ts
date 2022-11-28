import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { LatLng } from "../types/lat-lng";

@ValidatorConstraint({ name: "isValidPath", async: false })
class isValidPathConstraint implements ValidatorConstraintInterface {
    public validate(value: LatLng[]) {
        return value.length > 0 && value.every((elem) => elem.lat && elem.lng);
    }

    public defaultMessage(): string {
        return `Invalid path`;
    }
}

export function isValidPath(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isValidPath",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: isValidPathConstraint,
        });
    };
}
