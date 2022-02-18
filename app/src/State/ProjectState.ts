import {Project, ProjectStatus} from "../Models/Project.js";

type Listener<T> = (items: T[]) => void;

abstract class State <T>{
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project>{
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

export const projectState = ProjectState.getInstance();
