const { Dossier } = require('../database/models/User');

// Créer un nouveau dossier
exports.createDossier = async (req, res) => {
    try {
        const { Patient, Medecin, Infirmier, disease, internal, openDate, status, Hopital } = req.body;

        if (!Patient || !Medecin || !disease || internal === undefined || !openDate || !status || !Hopital) {
            return res.status(400).json({ error: "Les champs Patient, Medecin, disease, internal, openDate, status et Hopital sont obligatoires" });
        }

        const dossier = new Dossier({ Patient, Medecin, Infirmier, disease, internal, openDate, status, Hopital });
        await dossier.save();
        res.status(201).json({ message: 'Dossier créé avec succès', dossier });
    } catch (err) {
        res.status(500).json({ error: "Échec de la création du dossier" });
    }
};

// Lire tous les dossiers
exports.getAllDossiers = async (req, res) => {
    try {
        const dossiers = await Dossier.find().populate('Patient').populate('Medecin').populate('Infirmier').populate('Hopital');
        // Convert _id to id
        const formattedDossiers = dossiers.map(dossier => {
            return {
                id: dossier._id,
                Patient: dossier.Patient,
                Medecin: dossier.Medecin,
                Infirmier: dossier.Infirmier,
                disease: dossier.disease,
                internal: dossier.internal,
                openDate: dossier.openDate,
                status: dossier.status,
                Hopital: dossier.Hopital,
                createdAt: dossier.createdAt,
                updatedAt: dossier.updatedAt
            };
        });
        res.status(200).json(formattedDossiers);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des dossiers" });
    }
};

// Lire un dossier par ID
exports.getDossierById = async (req, res) => {
    try {
        const dossier = await Dossier.findById(req.params.id).populate('Patient').populate('Medecin').populate('Infirmier').populate('Hopital');
        if (!dossier) {
            return res.status(404).json({ error: "Dossier non trouvé" });
        }
        res.status(200).json(dossier);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du dossier" });
    }
};

// Mettre à jour un dossier
exports.updateDossier = async (req, res) => {
    try {
        const updates = req.body;

        const dossier = await Dossier.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!dossier) {
            return res.status(404).json({ error: "Dossier non trouvé" });
        }

        res.status(200).json(dossier);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du dossier" });
    }
};

// Supprimer un dossier
exports.deleteDossier = async (req, res) => {
    try {
        const dossier = await Dossier.findByIdAndDelete(req.params.id);
        if (!dossier) {
            return res.status(404).json({ error: "Dossier non trouvé" });
        }

        res.status(200).json({ message: "Dossier supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du dossier" });
    }
};
