import "./assets/style.css";
const form = document.querySelector("form") as HTMLFormElement;
const todoModal = document.querySelector(".todoModal") as HTMLDialogElement;
const newButtons = document.querySelectorAll(".addNew");
newButtons.forEach((button) => {
  button.addEventListener("click", () => {
    todoModal.showModal();
  });
});
interface Project {
  name: string;
  todos: Todo[];
}

interface Todo {
  title: string;
  description: string;
  duedate: Date;
  priority: number;
  project?: string;
  checklist?: string[];
}

class Todo implements Todo {
  title: string;
  description: string;
  duedate: Date;
  priority: number;
  project?: string;
  checklist?: string[];

  constructor(
    title: string,
    description: string,
    duedate: Date,
    priority: number,
    project?: string,
    checklist?: string[]
  ) {
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.project = project || "Default";
    this.checklist = checklist || [];
  }
}

const projects: Project[] = [
  {
    name: "Default",
    todos: [],
  },
];


function pushTodo(todo: Todo) {
  if (todo.project) {
    const project = projects.find((project) => project.name === todo.project);
    if (project) {
      project.todos.push(todo);
    } else {
      projects.push({
        name: todo.project,
        todos: [todo],
      });
    }
  } else {
    projects[0].todos.push(todo);
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = new Date(formData.get("dueDate") as string);
  const priority = parseInt(formData.get("priority") as string);
  const project = formData.get("project") as string;
  
  if (title && description && dueDate && !isNaN(priority)) {
    createTodo(title, description, dueDate, priority, project);
  } else {
    console.error("One or more form fields are missing or invalid.");
  }
  todoModal.close();
});
function createTodo(
  title: string,
  description: string,
  dueDate: Date,
  priority: number,
  project: string
  ) {
    const sampleTodo = new Todo(
      title,
      description,
      dueDate,
      priority,
      project || "Default"
      );
      let projectExists = false;
      
      // Check if the project already exists
      projects.forEach((p) => {
        if (p.name === sampleTodo.project) {
          projectExists = true;
          p.todos.push(sampleTodo);
      console.log("New todo created:", sampleTodo);
    }
  });
  
  // If the project does not exist, create it and add the todo
  if (!projectExists) {
    const newProject: Project = {
      name: sampleTodo.project,
      todos: [sampleTodo],
    };
    projects.push(newProject);
    console.log("New project created:", newProject);
  }
}
console.log("Projects: ", projects);

// add a new sub-task
// sampleTodo.checklist.push("Submit assignment");

// remove a sub-task
// sampleTodo.checklist.splice(1, 1);