// ===== LOGIN =====
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("msg").textContent = data.msg;
    return;
  }

  localStorage.setItem("user", data.user);
  localStorage.setItem("role", data.role);

  window.location.href = "home.html";
}

// ===== REGISTRO =====
async function register() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;

  // Validaciones básicas
  if (username.length < 4) {
    document.getElementById("msg").textContent = "Usuario mínimo 4 caracteres";
    return;
  }

  if (password.length < 6) {
    document.getElementById("msg").textContent = "Contraseña mínimo 6 caracteres";
    return;
  }

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  document.getElementById("msg").textContent = data.msg;
}

// ===== PROTEGER =====
if (window.location.pathname.includes("home.html")) {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location.href = "index.html";
  }

  document.getElementById("user").textContent =
    "Usuario: " + user;

  const role = localStorage.getItem("role");

  const menu = document.getElementById("menu");

  if (role === "admin") {
    menu.innerHTML = `
      <h3>Panel Admin 🛠️</h3>
      <ul>
        <li>📊 Ver estadísticas</li>
        <li>👥 Gestionar usuarios</li>
        <li>⚙️ Configuración</li>
      </ul>
    `;
  } else {
    menu.innerHTML = `
      <h3>Panel Usuario 👤</h3>
      <ul>
        <li>📁 Mis archivos</li>
        <li>📅 Actividad</li>
        <li>⚙️ Ajustes</li>
      </ul>
    `;
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}