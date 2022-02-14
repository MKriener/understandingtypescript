// validation
interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?:number
}

function validateItems(validatableInput: Validatable) {
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

// autobind decorator
function Autoload(_:any, _2:any, property: TypedPropertyDescriptor<any>) {
    const orginalMethod = property.value;
    const adjDescriptor : TypedPropertyDescriptor<any> = {
        configurable: true,
        enumerable: false,
        get () {
            return orginalMethod.bind(this);
        }
    };

    return adjDescriptor;
}




// ProjectInput Class
class ProjectInput {
    templateElement : HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement     = document.getElementById('app')! as HTMLDivElement;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeopleAmount = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        }

        const peopleValidatable: Validatable = {
            value: enteredPeopleAmount,
            required: true,
            min: 1,
            max: 5,
        }

        if(
            !validateItems(titleValidatable)
            || !validateItems(descriptionValidatable)
            || !validateItems(peopleValidatable)
        ) {
            alert('Invalid input, please try again');

            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeopleAmount];
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @Autoload
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, peopleAmount] = userInput;
            console.log(title, description, peopleAmount);
        }

        this.clearInputs();
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}


const prjInput = new ProjectInput();