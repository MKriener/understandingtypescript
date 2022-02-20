export enum ProjectStatus{ Active = 'active', Finished = 'finished'}

export class Project {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly amountOfPeople: number,
        public status: ProjectStatus,
    ) {}
}
