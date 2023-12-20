import { Router } from 'express';
import {
  getAuteurById,
  createAuteur,
  updateAuteur,
  deleteAuteur,
} from '../controllers/auteurs.controllers.js';
import { validateAuteurs } from '../validations/auteurs.validation.js';

const router = Router();

router.get('/:id', getAuteurById);
router.post('/', validateAuteurs, createAuteur);
router.put('/:id', updateAuteur);
router.delete('/:id', deleteAuteur);

export default router;


