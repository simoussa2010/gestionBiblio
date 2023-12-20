import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Auteur = sequelize.define('auteurs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING(255),
  },
  biographie: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  freezeTableName: true
});

export default Auteur;