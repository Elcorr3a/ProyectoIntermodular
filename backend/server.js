import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json()); // para leer JSON del frontend

//Ruta archivo JSON
const CLIENTES_FILE = path.join(process.cwd(), "clientes.json");

// Conexión a MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("CodeAcademy"); // tu base de datos
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}
connectDB();

// Endpoint para recibir presupuestos
app.post("/presupuestos", async (req, res) => {
  try {
    const data = req.body;
    data.fecha = new Date(); // fecha actual
    data.estado = "pendiente";
    const result = await db.collection("presupuestos").insertOne(data);
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error guardando presupuesto" });
  }
});

// Servidor escuchando
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Simple “autenticación” de ejemplo: una contraseña de admin
const ADMIN_PASSWORD = "1234";

// Endpoint para obtener mensajes
app.get("/admin/mensajes", async (req, res) => {
  const { password } = req.query; // recibimos la contraseña por query (solo para ejemplo)

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: "No autorizado" });
  }

  try {
    const mensajes = await db.collection("presupuestos").find({}).toArray();
    res.json({ success: true, mensajes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Error obteniendo mensajes" });
  }
});

// ======================= // ENDPOINT: LEER CLIENTES // =======================
app.get("/api/clientes", (req, res) => {
  try {
    const data = fs.readFileSync(CLIENTES_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error leyendo clientes.json" });
  }
});

// ======================= // ENDPOINT: AÑADIR CLIENTE // =======================
app.post("/api/clientes", (req, res) => {
  try {
    const { nombre, mensaje } = req.body;
    if (!nombre || !mensaje) {
      return res.status(400).json({ error: "Datos incompletos" });
    }
    const data = JSON.parse(fs.readFileSync(CLIENTES_FILE, "utf-8"));
    data.push({ nombre, mensaje });
    fs.writeFileSync(CLIENTES_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error guardando comentario" });
  }
});
