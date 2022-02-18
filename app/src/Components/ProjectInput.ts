import Autoload from "../Decorators/Autoload.js";
import * as Validation from "../Validators/Validation.js";
import {projectState} from "../State/ProjectState.js";
import Component from "./Component.js";

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true,'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    protected configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
    protected renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeopleAmount = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        }

        const peopleValidatable: Validation.Validatable = {
            value: enteredPeopleAmount,
            required: true,
            min: 1,
            max: 5,
        }

        if(
            ! Validation.validateItems(titleValidatable)
            || !Validation.validateItems(descriptionValidatable)
            || !Validation.validateItems(peopleValidatable)
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

            projectState.addProject(title, description, peopleAmount);
            this.clearInputs();
        }
    }
}
