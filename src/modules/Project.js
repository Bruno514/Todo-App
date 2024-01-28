import { v4 as uuidv4 } from "uuid";
import Task from "./Task";

export default class Project {
  constructor(name, desc="No description here", tasks = []) {
    this.id = uuidv4();
    this.name = name;
    this.desc = desc;
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  editTask(id) {
    const task = getTask(id);

    task.title = title;
    task.desc = desc;
    task.dueDate = dueDate;
    task.priority = priority;
  }

  deleteTask(id) {
    const taskIndex = this.tasks.indexOf(this.getTask(id));
    this.tasks.splice(taskIndex, 1);

    // Returns task index idk why
    return taskIndex;
  }

  completeTask(id) {
    const task = this.getTask(id);
    task.isCompleted = !task.isCompleted;
  }

  getTask(id) {
    let task = undefined;

    this.tasks.forEach((element) => {
      if (id == element.id) {
        task = element;
      }
    });

    if (task === undefined) {
      throw new Error("Task not found.");
    }

    return task;
  }
}
