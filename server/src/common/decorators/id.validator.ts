import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isValidId", async: false })
class isValidIdConstraint implements ValidatorConstraintInterface {
    public validate(value: string) {
        return (
            typeof value === "string" && value.length >= 6 && value.length <= 20 && value.search(/^[a-zA-Z0-9]*$/) >= 0
        );
    }

    public defaultMessage(): string {
        return `user id must be between 6 and 20 character long, only letters and numbers allowed`;
    }
}

export function IsValidId(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isValidId",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: isValidIdConstraint,
        });
    };
}
