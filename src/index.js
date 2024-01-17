import "./style.css";

import { v4 as uuidv4 } from "uuid";

import {
  createIconAdd,
  createIconDelete,
  createIconEdit,
} from "./modules/utils";
import Project from "./modules/Project.js";
import Task from "./modules/Task.js";
import TodoList from "./modules/TodoList.js";

const todoList = new TodoList();

const defaultProject = new Project("Default", "My Default for to-do's");
defaultProject.addTask(
  new Task("Clean House Whatever", "Clean my house", "20/02/2024", "important")
);
todoList.addProject(defaultProject);
let selectedProject = todoList.projects[0].id;

function DOMHandler() {
  document.title = "Todo App";

  const projectsSelect = document.querySelector("select#projects");

  // Project modal
  const prModal = document.querySelector("[data-modal-project]");
  // Task modal
  const taModal = document.querySelector("[data-modal-task]");

  const _addProject = () => {
    const title = prModal.querySelector("#title").value;
    const desc = prModal.querySelector("#description").value;

    const project = new Project(title, desc);
    todoList.addProject(project);
    _changeProjectsOptions();

    projectsSelect.value = project.id;

    selectedProject = projectsSelect.value;
    _loadProject();
  };

  const _changeProjectsOptions = () => {
    // Clear options first
    projectsSelect.textContent = "";

    todoList.projects.forEach((element) => {
      const option = document.createElement("option");
      option.value = element.id;
      option.textContent = element.name;

      projectsSelect.appendChild(option);
    });
  };

  // Show tasks from project
  const _loadProject = () => {
    // Actually clear the table first
    const toDelete = Array.from(document.querySelectorAll("tr")).slice(1);
    toDelete.forEach((element) => {
      element.remove();
    });

    const project = todoList.getProject(selectedProject);
    const table = document.querySelector("table");

    project.projectArray.forEach((task) => {
      const tr = document.createElement("tr");

      const tdTitle = document.createElement("td");
      tdTitle.textContent = task.title;
      tdTitle.classList.add("task-title");
      const tdDueDate = document.createElement("td");
      tdDueDate.textContent = task.dueDate;
      tdDueDate.classList.add("task-due-date");
      const tdPriority = document.createElement("td");
      tdPriority.textContent = task.priority;
      tdPriority.classList.add("tasks-priority");

      tr.appendChild(tdTitle);
      tr.appendChild(tdDueDate);
      tr.appendChild(tdPriority);
      table.appendChild(tr);
    });
  };

  const _addTask = () => {
    const title = taModal.querySelector("#title").value;
    const desc = taModal.querySelector("#description").value;
    const dueDate = taModal.querySelector("#due-date").value;
    const priority = taModal.querySelector("#priority").value;

    const task = new Task(title, desc, dueDate, priority);

    todoList.getProject(selectedProject).addTask(task);
    _loadProject();
  };

  const initialLoad = () => {
    _changeProjectsOptions();
    _loadProject();
  };

  const setupEventHandlers = () => {
    const projectModalOpen = document.querySelector(
      ".projects-dropdown .add-btn"
    );
    projectModalOpen.addEventListener("click", () => {
      prModal.showModal();
    });

    // Add a project when clicking modal
    // const projectModalSubmit = prModal.querySelector('button[type = "submit"]');
    const projectModalSubmit = prModal.querySelector("form");
    projectModalSubmit.addEventListener("submit", (event) => {
      event.preventDefault();
      _addProject();
      prModal.close();
    });

    projectsSelect.addEventListener("change", (event) => {
      selectedProject = event.target.value;
      _loadProject();
    });

    const taskModalOpen = document.querySelector(".tasks-action button");
    taskModalOpen.addEventListener("click", () => {
      taModal.showModal();
    });

    const taskModalSubmit = taModal.querySelector("form");
    taskModalSubmit.addEventListener("submit", (event) => {
      event.preventDefault();
      _addTask();
      taModal.close();
    });
  };

  return { setupEventHandlers, initialLoad };
}

const dom = DOMHandler();

dom.initialLoad();
dom.setupEventHandlers();
