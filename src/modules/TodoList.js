export default class TodoList {
  constructor() {
    this.projects = [];
  }
  addProject(project) {
    this.projects.push(project);
  }

  getProject(index) {
    const project = this.projects(index);
    if (project === undefined) {
      throw new Error("Project not found.");
    }

    return project;
  }
}
