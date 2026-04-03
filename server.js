const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const FILE = path.join(__dirname, "users.json");

// Obtener usuarios
app.get("/users", (req, res) => {
  const data = fs.readFileSync(FILE);
  res.json(JSON.parse(data));
});

// Registrar usuario
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  let users = JSON.parse(fs.readFileSync(FILE));

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  users.push({ username, password });
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));

  res.json({ msg: "Usuario creado" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let users = JSON.parse(fs.readFileSync(FILE));

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ msg: "Credenciales incorrectas" });
  }

  res.json({ msg: "OK", user: username });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));