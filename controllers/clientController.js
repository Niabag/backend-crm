const Client = require("../models/client");
const mongoose = require("mongoose");
const Devis = require("../models/devis");

exports.registerClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { userId } = req.params;

    console.log("➡️ Données reçues pour l'inscription :", { name, email, phone, userId });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("❌ ERREUR: userId invalide !");
      return res.status(400).json({ message: "User ID invalide" });
    }

    const existingClient = await Client.findOne({ email, userId });
    if (existingClient) {
      console.error("❌ ERREUR: Un client avec cet email existe déjà pour cet utilisateur !");
      return res.status(400).json({ message: "Ce client existe déjà dans votre liste." });
    }

    const newClient = new Client({
      name,
      email,
      phone,
      userId: new mongoose.Types.ObjectId(userId),
    });

    await newClient.save();
    console.log("✅ Client enregistré avec succès !");
    res.status(201).json({ message: "Client enregistré avec succès !" });

  } catch (error) {
    console.error("❌ ERREUR LORS DE L'INSCRIPTION DU CLIENT :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription du client", error });
  }
};

exports.getClients = async (req, res) => {
  try {
    console.log("User ID de la requête:", req.userId);

    const clients = await Client.find({ userId: req.userId });

    console.log("Clients trouvés:", clients);
    res.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des clients" });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    await Devis.deleteMany({ clientId });

    await Client.findByIdAndDelete(clientId);

    res.status(200).json({ message: "✅ Client et ses devis supprimés" });
  } catch (err) {
    console.error("❌ Erreur suppression client :", err);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};
