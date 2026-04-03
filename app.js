// LOGIN
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("logged", "true");
    localStorage.setItem("user", data.user);
    window.location.href = "home.html";
  } else {
    document.getElementById("msg").textContent = data.msg;
  }
}

// REGISTRO
async function register() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  document.getElementById("msg").textContent = data.msg;
}

// PROTEGER PÁGINAS
if (window.location.pathname.includes("home.html")) {
  if (localStorage.getItem("logged") !== "true") {
    window.location.href = "index.html";
  }

  document.getElementById("user").textContent =
    "Usuario: " + localStorage.getItem("user");
}

// LOGOUT
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// VER USUARIOS
async function loadUsers() {
  const res = await fetch("/users");
  const users = await res.json();

  const list = document.getElementById("userList");

  users.forEach(u => {
    let li = document.createElement("li");
    li.textContent = u.username;
    list.appendChild(li);
  });
}