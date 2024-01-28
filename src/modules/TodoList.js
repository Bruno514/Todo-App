import Project from "./Project";

export default class TodoList {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProject(id) {
    let project = undefined;

    this.projects.forEach((element) => {
      if (id == element.id) {
        project = element;
      }
    });

    if (project === undefined) {
      throw new Error("Project not found.");
    }

    return project;
  }

  deleteProject(project) {
    const index = this.projects.indexOf(project);
    this.projects.splice(index, 1);

    // Return index cause why not
    return index;
  }
}
