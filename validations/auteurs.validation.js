import Joi from 'joi';

const auteursSchema = Joi.object({

    nom: Joi.string().min(3).required(),

}).unknown(true);;

export const validateAuteurs = (req, res, next) => {
    const { error } = auteursSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
};

/*
// Importation du module Joi pour la validation de schéma
const Joi = require('joi');

// Définition d'un schéma de validation pour un utilisateur
const utilisateurSchema = Joi.object({
    // La propriété 'email' doit être une chaîne de caractères au format email valide et est requise
    email: Joi.string().email().required(),

    // La propriété 'password' doit être une chaîne de caractères d'au moins 6 caractères et est requise
    password: Joi.string().min(6).required(),

    // La propriété 'role' doit être une chaîne de caractères qui est soit 'admin' soit 'utilisateur' et est requise
    role: Joi.string().valid('admin', 'utilisateur').required(),
});

// Exportation du schéma pour une utilisation ultérieure dans d'autres fichiers
module.exports = utilisateurSchema;


*/