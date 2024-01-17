export default class Project {
  constructor(name, desc) {
    this.name = name;
    this.desc = desc;
    this.projectArray = [];
  }

  addTask(task) {
    this.projectArray.push(task);
  }
}
