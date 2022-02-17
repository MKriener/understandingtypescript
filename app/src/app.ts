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
// Project States
type Listener<T> = (items: T[]) => void;

abstract class State <T>{
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    public static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    private constructor() {
        super();
    }

    addProject(title: string, description: string, numOfPeople: number) {
        this.projects.push(new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        ));

        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenersFn of this.listeners) {
            listenersFn(this.projects.slice());
        }
    }
}

// Drag and Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent) : void
    dropHandler(event: DragEvent) : void
    dropLeaveHandler(event: DragEvent) : void
}


// Project Type
enum ProjectStatus{ Active = 'active', Finished = 'finished'}

class Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly amountOfPeople: number,
        public status: ProjectStatus,
    ) {}
}

// Component Base Class

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U; //SectionElement

    protected constructor(templateId: string, hostTemplateId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement     = document.getElementById(hostTemplateId)! as T;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as U;
        if (typeof newElementId === "string") {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: Boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    protected abstract configure(): void;
    protected abstract renderContent(): void;
}

// ProjectItem
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    get persons() {
        let text = this.project.amountOfPeople.toString();
        return text += this.project.amountOfPeople === 1 ? ' Person' : ' Persons';
    }

    constructor(hostId: string, private readonly project: Project) {
        super('single-project', hostId, false, project.id);

        this.configure();
        this.renderContent();
    }

    protected configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    protected renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @Autoload
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @Autoload
    dragEndHandler(_: DragEvent): void {
        console.log('DragEnd');
    }
}


// ProjectList

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private readonly type: ProjectStatus) {
        super('project-list', 'app', false,`${type}-projects`);

        this.configure();
        this.renderContent();
    }

    @Autoload
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @Autoload
    dropLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @Autoload
    dropHandler(event: DragEvent): void {
        event.preventDefault()
        const prjId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(prjId, this.type);
    }

    protected configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dropLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => prj.status === this.type);
            this.renderProjects();
        });
    }

    protected renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
           new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
}


// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

            projectState.addProject(title, description, peopleAmount);
            this.clearInputs();
        }
    }
}

const projectState = ProjectState.getInstance();

const prjInput = new ProjectInput();

const activeProjectList = new ProjectList(ProjectStatus.Active);

const finishedProjectList = new ProjectList(ProjectStatus.Finished);