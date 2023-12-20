// Importation des modules nécessaires
import bcrypt from 'bcryptjs'; // Pour le hachage des mots de passe
import jwt from 'jsonwebtoken'; // Pour créer des tokens JWT
import Utilisateur from '../models/utilisateurs.model.js'; // Le modèle Sequelize pour les utilisateurs


// Clé secrète pour les tokens JWT
const secret = process.env.JWT_SECRET;

// Fonction pour enregistrer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {

  try {
    // Récupération des données d'inscription de l'utilisateur
    const { email, motDePasse, role } = req.body;
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 12);

    // Création de l'utilisateur avec le mot de passe haché
    const newUtilisateur = await Utilisateur.create({
      email,
      motDePasse: hashedPassword,
      role,
    });

    // Réponse avec le statut 201 (Created) et les données de l'utilisateur créé
    res.status(201).json(newUtilisateur);

  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur', error });
  }
};

// Fonction pour connecter un utilisateur
export const getUtilisateur = async (req, res) => {

  const email = req.query.email
  const motDePasse = req.query.motDePasse

  try {
    // Récupération des données de connexion
    // Recherche de l'utilisateur par son nom d'utilisateur
    const utilisateur = await Utilisateur.findOne({ where: { email } });

    // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérification si le mot de passe est correct
    const isPasswordCorrect = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    // Si le mot de passe est incorrect, renvoie une erreur 400
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Si le mot de passe est correct, création d'un token JWT
    const token = jwt.sign({ email: utilisateur.email, id: utilisateur.id, role: utilisateur.role }, secret, { expiresIn: '15min' });

    res.cookie('token', token, { httpOnly: true });

    // Renvoie les informations de l'utilisateur et le token
    const emailTrouver = utilisateur.email
    const roleTrouver = utilisateur.role
    res.status(200).json({ result: {emailTrouver, roleTrouver}, token });
    
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }

};



// Méthode pour modifier un utilisateur
export const updateUtilisateur = async (req, res) => {
  // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
  const { id } = req.params;
  // Récupération des données à mettre à jour
  const { motdepasse, role } = req.body;

  try {
    // Recherche de l'utilisateur par son ID
    const utilisateur = await Utilisateur.findByPk(id);

    // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Hachage du nouveau mot de passe s'il est fourni, sinon utilise le mot de passe actuel
    const hashedPassword = motdepasse ? await bcrypt.hash(motdepasse, 12) : utilisateur.motdepasse;

    // Mise à jour de l'utilisateur avec les nouvelles données
    const updatedUtilisateur = await utilisateur.update({ motdepasse: hashedPassword, role });

    // Création d'un nouveau token JWT pour l'utilisateur mis à jour
    const token = jwt.sign({ email: updatedUtilisateur.email, id: updatedUtilisateur.id, role: updatedUtilisateur.role }, secret, { expiresIn: '1h' });

    // Renvoie les informations de l'utilisateur mis à jour et le nouveau token
    res.status(200).json({ result: updatedUtilisateur, token });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
  }
};

// Méthode pour supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
  const { id } = req.params;

  try {
    // Recherche de l'utilisateur par son ID
    const utilisateur = await Utilisateur.findByPk(id);

    // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Suppression de l'utilisateur
    await utilisateur.destroy();

    // Renvoie une confirmation de la suppression
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    // En cas d'erreur, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur', error });
  }
};