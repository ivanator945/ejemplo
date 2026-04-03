export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Simulación (Vercel NO permite guardar archivos)
  if (!username || !password) {
    return res.status(400).json({ msg: "Faltan datos" });
  }

  // Usuario admin
  if (username === "admin") {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  // Aquí SOLO simulamos éxito
  return res.status(200).json({
    msg: "Usuario registrado ✔ (modo demo)",
    user: username
  });
}