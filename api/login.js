import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const filePath = path.join(process.cwd(), "users.json");
  const users = JSON.parse(fs.readFileSync(filePath));

  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ msg: "Credenciales incorrectas" });
  }

  res.status(200).json({
    user: user.username,
    role: user.role
  });
}