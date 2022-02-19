import {Project} from "../Models/Project";
import Component from "./Component";
import {Draggable} from "../Models/DragAndDrop";
import Autoload from "../Decorators/Autoload";

export default class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    get persons() {
        let text = this.project.amountOfPeople.toString();
        return text + (this.project.amountOfPeople === 1 ? ' Person' : ' Persons');
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