const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const FILE = path.join(__dirname, "users.json");

// ===== SERVIR HTML MANUAL =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

// ===== USERS =====
function getUsers() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// ===== REGISTER =====
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  let users = getUsers();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  users.push({ username, password, role: "user" });
  saveUsers(users);

  res.json({ msg: "Usuario creado ✔" });
});

// ===== LOGIN =====
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let users = getUsers();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ msg: "Credenciales incorrectas" });
  }

  res.json({
    msg: "OK",
    user: user.username,
    role: user.role
  });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});