// LOGIN
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
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

// REGISTER
async function register() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;

  const res = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  document.getElementById("msg").textContent = data.msg;
}