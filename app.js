const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
const devisRoutes = require("./routes/devisRoutes");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connexion à MongoDB réussie !"))
.catch((error) => console.error("❌ Connexion à MongoDB échouée :", error));

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/devis", devisRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend opérationnel 🚀");
});

module.exports = app;