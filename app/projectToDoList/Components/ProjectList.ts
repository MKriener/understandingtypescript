import {projectState} from "../State/ProjectState";
import ProjectItem from "./ProjectItem";
import * as Project from "../Models/Project";
import Autoload from "../Decorators/Autoload";
import Component from "./Component";
import {DragTarget} from "../Models/DragAndDrop";

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project.Project[] = [];

    constructor(private readonly type: Project.ProjectStatus) {
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
        projectState.addListener((projects: Project.Project[]) => {
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