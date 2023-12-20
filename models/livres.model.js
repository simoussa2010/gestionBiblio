import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import Auteur from './auteurs.model.js';
export const Livre = sequelize.define('livres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    auteurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Auteur,
            key: 'id',
        }
    },

    annee: {
        type: DataTypes.STRING(4),
        // Utiliser le type de données DATEONLY pour représenter une année
        validate: {
            isDate: { format: 'YYYY' },  // Validation pour assurer que la valeur est une date au format YYYY
        },
    },
    genre: {
        type: DataTypes.STRING(100),

    },


}, {
    timestamps: false,
    freezeTableName: true
});

//Ajout Moussa
Livre.belongsTo(Auteur, { foreignKey: 'auteurId' });
Auteur.hasMany(Livre, { foreignKey: 'auteurId' });


export default Livre;