import ProjectInput from "./Components/ProjectInput.js";
import ProjectList from "./Components/ProjectList.js";
import {ProjectStatus} from "./Models/Project.js";

new ProjectInput();

new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);


