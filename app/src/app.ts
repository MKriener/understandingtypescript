import ProjectInput from "./Components/ProjectInput";
import ProjectList from "./Components/ProjectList";
import {ProjectStatus} from "./Models/Project";

new ProjectInput();

new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);


