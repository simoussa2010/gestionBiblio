import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import UtilisateursRouter from './routes/utilisateurs.routes.js'; //routes utilisateurs
import LivresRouter from './routes/livres.routes.js';  //route livres
import AuteursRouter from './routes/auteurs.routes.js'; //route auteurs

import { errorHandler } from './middlewares/errorHandler.js';
import { sequelize } from './config/config.js';
import { config } from 'dotenv';

// Chargement des variables d'environnement
config();
// Création d'une instance de l'application Express
const app = express();
// Middleware de sécurité
app.use(helmet());
app.use(cors());
// Utilisation de bodyParser pour analyser les requêtes JSON entrantes
app.use(bodyParser.json());

// Définition des routes
app.use('/gestionBiblio/utilisateurs', UtilisateursRouter);
app.use('/gestionBiblio/livres', LivresRouter);
app.use('/gestionBiblio/auteurs', AuteursRouter);


// Utilisation du middleware pour la gestion des erreurs
app.use(errorHandler);
app.use(errorHandler);
// Définition du port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;
// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

