// Usuario "falso" para práctica
const USER = "admin";
const PASS = "1234";

const form = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

// Verificar si ya está logueado
if (localStorage.getItem("logged") === "true") {
  window.location.href = "home.html";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === USER && password === PASS) {
    localStorage.setItem("logged", "true");
    localStorage.setItem("user", username);

    window.location.href = "home.html";
  } else {
    mensaje.textContent = "Usuario o contraseña incorrectos";
    mensaje.style.color = "red";
  }
});