console.log("hello bird");
import "./assets/style.scss";
console.log("hello bird");

interface Project {
  name: string;
  todos: Todo[];
}

interface Todo {
  title: string;
  description: string;
  duedate: Date;
  priority: number;
  notes: string;
  project?: string;
}

class Todo {
  title: string;
  description: string;
  duedate: Date;
  priority: number;
  notes: string;
  project?: string;

  constructor(
    title: string,
    description: string,
    duedate: Date,
    priority: number,
    notes: string,
    project?: string
  ) {
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.notes = notes;
    this.project = project;
  }
}

const projects: Project[] = [
  {
    name: "Default",
    todos: [],
  },
];

// smaple
const newTodo = new Todo(
  "Finish project",
  "Complete all tasks and submit before deadline",
  new Date("2023-05-01"),
  2,
  "Remember to double-check all work before submission",
  "Work"
);

if (newTodo.project) {
  const project = projects.find((project) => project.name === newTodo.project);
  if (project) {
    project.todos.push(newTodo);
  } else {
    projects.push({
      name: newTodo.project,
      todos: [newTodo],
    });
  }
} else {
  projects[0].todos.push(newTodo);
}
console.log(projects);

const form = document.querySelector("form");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = new Date(formData.get("dueDate") as string);
  const priority = parseInt(formData.get("priority") as string);
  const notes = formData.get("notes") as string;
  const project = formData.get("project") as string;

  if (title && description && dueDate && !isNaN(priority) && notes) {
    const newTodo = new Todo(
      title,
      description,
      dueDate,
      priority,
      notes,
      project || "Default"
    );
    let projectExists = false;

    // Check if the project already exists
    projects.forEach((p) => {
      if (p.name === newTodo.project) {
        projectExists = true;
        p.todos.push(newTodo);
        console.log("New todo created:", newTodo);
      }
    });

    // If the project does not exist, create it and add the todo
    if (!projectExists) {
      const newProject: Project = {
        name: newTodo.project,
        todos: [newTodo],
      };
      projects.push(newProject);
      console.log("New project created:", newProject);
    }
  } else {
    console.error("One or more form fields are missing or invalid.");
  }
  console.log(projects);
});
