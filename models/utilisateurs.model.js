import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

const Utilisateur = sequelize.define('utilisateurs', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true, 
    },
    motDePasse: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(20),
    },
}, {
    timestamps: false,
    freezeTableName: true,
});



export default Utilisateur;
