import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const filePath = path.join(process.cwd(), "users.json");
  const users = JSON.parse(fs.readFileSync(filePath));

  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  users.push({ username, password, role: "user" });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(200).json({ msg: "Usuario creado ✔" });
}