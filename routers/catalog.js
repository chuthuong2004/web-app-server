import express from 'express';
import catalogController from '../controllers/catalogController.js';
const router = express.Router();
router.get('/', catalogController.getAllCatalog);
router.get('/:id', catalogController.getCatalog);
router.post('/', catalogController.addCatalog);
router.put('/:id', catalogController.updateCatalog);
router.delete('/:id', catalogController.deleteCatalog);
export default router;