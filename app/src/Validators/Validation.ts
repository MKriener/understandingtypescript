export interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?:number
}

export function validateItems(validatableInput: Validatable) {
    if (validatableInput.required && validatableInput.value.toString().trim().length === 0) {
        return false;
    }

    if (typeof validatableInput.value === 'string') {
        if (validatableInput.minLength !== undefined && validatableInput.value.length < validatableInput.minLength) {
            return false;
        }

        if (validatableInput.maxLength !== undefined && validatableInput.value.length > validatableInput.maxLength) {
            return false;
        }

        return true;
    }

    if (validatableInput.max !== undefined && validatableInput.value > validatableInput.max) {
        return false;
    }

    return !(validatableInput.min !== undefined && validatableInput.value < validatableInput.min);
}