const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tasks = [];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  let html = `
  <html>
  <head>
    <title>Task Manager</title>
    <style>
      body {
        font-family: Arial;
        padding: 20px;
        background: #f5f7fa;
      }
      .done {
        text-decoration: line-through;
        color: gray;
      }
      li {
        padding: 6px;
        margin-bottom: 4px;
        border-radius: 4px;
      }
      li:hover { background: #eee; }
      button { cursor: pointer; }
      input { padding: 4px; }
      form { margin-top: 6px; }
    </style>
  </head>
  <body>
    <h2>Add Task</h2>
    <form method="POST" action="/add">
      <input type="text" name="task" required />
      <button>Add</button>
    </form>

    <h2>Tasks</h2>
    <ul>
  `;

  tasks.forEach((t, i) => {
    html += `
      <li class="${t.completed ? "done" : ""}">
        ${t.name}
        ${!t.completed ? `
        <form style="display:inline" method="POST" action="/complete">
          <input type="hidden" name="index" value="${i}" />
          <button>✔</button>
        </form>` : ""}
      </li>
    `;
  });

  html += `
    </ul>
  </body>
  </html>
  `;

  res.send(html);
});

app.post("/add", (req, res) => {
  tasks.push({ name: req.body.task, completed: false });
  res.redirect("/");
});

app.post("/complete", (req, res) => {
  const index = req.body.index;
  if (tasks[index]) {
    tasks[index].completed = true;
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
