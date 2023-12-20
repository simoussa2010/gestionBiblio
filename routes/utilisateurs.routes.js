// Importation du module Router d'Express et des contrôleurs nécessaires
import { Router } from 'express';
import {
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
} from '../controllers/utilisateurs.controllers.js';
import { validateUtilisateurs } from '../validations/utilisateurs.validation.js';

// Importation des middlewares d'authentification et d'autorisation
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorize } from '../middlewares/authorize.js';
const router = Router();

router.get('/', getUtilisateur);
router.post('/', createUtilisateur);
router.put('/update/:id', authenticateToken, authorize(['admin']), updateUtilisateur);
// Route pour supprimer un utilisateur
// De même, protégée par l'authentification et l'autorisation
router.delete('/delete/:id', authenticateToken, authorize(['admin']), deleteUtilisateur);

// Exportation du routeur pour une utilisation dans l'application principale
export default router;
