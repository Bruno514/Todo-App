import { v4 as uuidv4 } from "uuid";

export default class Project {
  constructor(name, desc) {
    this.id = uuidv4();
    this.name = name;
    this.desc = desc;
    this.projectArray = [];
  }

  addTask(task) {
    this.projectArray.push(task);
  }
}
