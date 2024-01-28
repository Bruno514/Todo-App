import { isThisWeek, isToday } from "date-fns";
import Project from "./Project";
import Task from "./Task";
import TodoList from "./TodoList";

export default function Storage() {
  const defaultProject = new Project("Default");
  defaultProject.addTask(
    new Task(
      "Clean House Whatever",
      "Clean my house",
      new Date(2024, 2, 3),
      "important"
    )
  );

  const todoList = new TodoList();
  todoList.addProject(defaultProject);

  let selectedProject = todoList.projects[0];

  function addProject(name, desc) {
    const project = new Project(name, desc);
    todoList.addProject(project);
    selectedProject = project;
  }

  function editProject(name, desc) {
    selectedProject.name = name;
    selectedProject.desc = desc;
  }

  function deleteProject() {
    if (selectedProject.name === "Default") {
      throw new Error("Can not delete default project.");
    }
    const index = todoList.deleteProject(selectedProject);
    selectedProject = todoList.projects[index - 1];

    if (selectedProject === undefined) {
      selectedProject = todoList.projects[0];
    }
  }

  function addTask(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    selectedProject.addTask(task);
  }

  function editTask(id, title, description, dueDate, priority) {
    const task = selectedProject.getTask(id);
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
  }

  function deleteTask(id) {
    selectedProject.deleteTask(id);
  }

  function completeTask(id) {
    selectedProject.completeTask(id);
  }

  function getAllProjects() {
    return todoList.projects;
  }

  function getSelectedProject() {
    return selectedProject;
  }

  function setSelectedProject(id) {
    selectedProject = todoList.getProject(id);
  }

  function getAllTasks() {
    const allTasks = [];

    getAllProjects().forEach((element) => {
      return allTasks.push(element.tasks);
    });

    return allTasks.flat();
  }

  function getWeekTasks() {
    const weekTasks = getAllTasks().filter((element) => {
      return isThisWeek(element);
    });

    return weekTasks;
  }

  function getTodayTasks() {
    const todayTasks = getAllTasks().filter((element) => {
      return isToday(element);
    });

    return todayTasks;
  }

  return {
    addProject,
    deleteProject,
    editProject,
    addTask,
    editTask,
    deleteTask,
    completeTask,
    getAllProjects,
    getSelectedProject,
    setSelectedProject,
    getAllTasks,
    getTodayTasks,
    getWeekTasks,
  };
}
