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

  let data;

  try {
    data = await res.json();
  } catch (e) {
    console.error("Error leyendo JSON");
    return;
  }

  const msg = document.getElementById("msg");

  if (!res.ok) {
    msg.textContent = data.msg;
    msg.style.color = "red";
    return;
  }

  msg.textContent = data.msg;
  msg.style.color = "green";
}