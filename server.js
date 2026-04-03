const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const FILE = path.join(__dirname, "users.json");

// Leer usuarios
function getUsers() {
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
}

// Guardar usuarios
function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// REGISTRO
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  let users = getUsers();

  // Validar usuario existente
  const exists = users.find(u => u.username === username);

  if (exists) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  // Añadir usuario
  users.push({
    username,
    password,
    role: "user"
  });

  saveUsers(users);

  res.json({ msg: "Usuario creado correctamente ✔" });
});

// LOGIN
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

app.listen(3000, () =>
  console.log("Servidor en http://localhost:3000")
);