import { Router } from 'express';
import {
  getLivreById,
  createLivre,
  updateLivre,
  deleteLivre,
} from '../controllers/livres.controllers.js';
import { validateLivres } from '../validations/livres.validation.js';


const router = Router();

router.get('/:id', getLivreById);
router.post('/', validateLivres, createLivre);
router.put('/:id', updateLivre);
router.delete('/:id', deleteLivre);

export default router;