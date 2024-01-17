import "./style.css";

import { createIconify } from "./modules/utils";
import Project from "./modules/Project.js";
import Task from "./modules/Task.js";
import TodoList from "./modules/TodoList.js";

const todoList = new TodoList();

todoList.addProject(new Project("Default", "My default for to-do's"));
const selectedProject = 0;

function DOMHandler() {
  document.title = "Todo App";
  const root = document.getElementById("root");

  const prModal = document.querySelector("[data-modal-project]");
  const taModal = document.querySelector("[data-modal-task]");

  // Reusable ones
  const _createIconAdd = () => {
    return createIconify("mingcute:add-fill");
  };
  const _createIconEdit = () => {
    return createIconify("akar-icons:edit");
  };
  const _createIconDelete = () => {
    return createIconify("material-symbols:delete-outline");
  };

  const _addProject = () => {
    const title = prModal.querySelector("#title").value;
    const desc = prModal.querySelector("#description").value;

    todoList.addProject(new Project(title, desc));
    console.log(todoList.projects);
  };

  const setupEventHandlers = () => {
    const projectModalOpen = document.querySelector(
      ".projects-dropdown .add-btn"
    );
    projectModalOpen.addEventListener("click", () => {
      prModal.showModal();
    });

    const projectModalSubmit = prModal.querySelector('button[type = "submit"]');
    prModal.addEventListener("submit", (event) => {
      event.preventDefault();
      _addProject();
    });
  };

  return { setupEventHandlers };
}

const dom = DOMHandler();
dom.setupEventHandlers();

// dom.setupHeader();
//dom.setupSidebar();
