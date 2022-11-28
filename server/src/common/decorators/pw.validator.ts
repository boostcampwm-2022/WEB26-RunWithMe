import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isValidPassword", async: false })
class isValidPwConstraint implements ValidatorConstraintInterface {
    public validate(value: string) {
        return typeof value === "string" && value.length >= 10 && value.length <= 100;
    }

    public defaultMessage(): string {
        return `user password must be between 10 and 100 character long`;
    }
}

export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isValidPassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: isValidPwConstraint,
        });
    };
}
