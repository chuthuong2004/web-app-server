import express from 'express';
import productController from '../controllers/productController.js';
const router = express.Router();
router.get('/', productController.getAllProduct); // lấy tất cả sản phẩm
router.get('/:slug', productController.getProduct); // lấy sản phẩm dựa trên :slug (name của producdt)
router.post('/', productController.addProduct); // thêm mới 1 product
router.put('/:id', productController.updateProduct); // update 1 product
// router.delete('/:id', deleteProduct);
router.patch('/restore/:id', productController.restoreProduct);
router.delete('/:id', productController.destroyProduct);
router.delete('/force/:id', productController.forceDestroyProduct);
export default router;