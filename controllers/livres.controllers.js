import Livre from '../models/livres.model.js';

import { sequelize } from '../config/config.js'; // Importez votre instance Sequelize

import { Sequelize } from 'sequelize';


export const getLivreById = async (req, res, next) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    if (livre) {
      res.status(200).json(livre);
    } else {
      res.status(404).json({ message: 'Livre not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const createLivre = async (req, res, next) => {
  console.log("test0")
  try {
    console.log("test1")
    console.log(req.body)
    const livre = await Livre.create(req.body);
    console.log("test2")

    res.status(201).json(livre);
    console.log("test3")

  } catch (error) {
    next(error);
  }
};

export const updateLivre = async (req, res, next) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    console.log("je suis dans test updatelivre")

    if (livre) {
      await livre.update(req.body);
      res.status(200).json(livre);
    } else {
      res.status(404).json({ message: 'Livre not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteLivre = async (req, res, next) => {
  try {
    const livre = await Livre.findByPk(req.params.id);
    if (livre) {
      await livre.destroy();
      res.status(200).json({ message: 'Livre deleted' });
    } else {
      res.status(404).json({ message: 'Livre not found' });
    }
  } catch (error) {
    next(error);
  }
};



