import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isValidDateTime", async: false })
class isValidDateTimeConstraint implements ValidatorConstraintInterface {
    public validate(value: string) {
        const dateRegex = /^(2\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
        const timeRegex = /^(0[0-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

        return (
            typeof value === "string" &&
            value.length === 19 &&
            dateRegex.test(value.split(" ")[0]) &&
            timeRegex.test(value.split(" ")[1])
        );
    }

    public defaultMessage(): string {
        return `user id must be between 6 and 20 character long, only letters and numbers allowed`;
    }
}

export function IsValidDateTime(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isValidDateTime",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: isValidDateTimeConstraint,
        });
    };
}
