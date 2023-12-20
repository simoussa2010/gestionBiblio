import Auteur from '../models/auteurs.model.js';

import { sequelize } from '../config/config.js'; // Importez votre instance Sequelize

import { Sequelize } from 'sequelize';

//Méthode pour réccuperer un auteur par son id
export const getAuteurById = async (req, res, next) => {
  try {
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      res.status(200).json(auteur);
    } else {
      res.status(404).json({ message: 'Auteur not found' });
    }
  } catch (error) {
    next(error);
  }
};

//Méthode pour créer un auteur

export const createAuteur = async (req, res, next) => {
  console.log("je suis dans createAuteur avant req ")
  console.log(req.body)

  try {
    console.log("je suis dans createAuteur API ")
    const auteur = await Auteur.create(req.body);
    res.status(201).json(auteur);
  } catch (error) {
    next(error);
  }
};

//Méthode pour mettre à jour un auteur

export const updateAuteur = async (req, res, next) => {
  console.log("Je suis dans UpdateAuteur")
  try {
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      await auteur.update(req.body);
      res.status(200).json(auteur);
    } else {
      res.status(404).json({ message: 'Auteur not found' });
    }
  } catch (error) {
    next(error);
  }
};

//Méthode pour supprimer un auteur

export const deleteAuteur = async (req, res, next) => {
  try {
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      await auteur.destroy();
      res.status(200).json({ message: 'Auteur deleted' });
    } else {
      res.status(404).json({ message: 'Auteur not found' });
    }
  } catch (error) {
    next(error);
  }
};