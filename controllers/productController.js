import { ProductModel } from "../models/ProductModel.js";

const productController = {
    getAllProduct: async(req, res) => {
        try {
            const products = await ProductModel.find();
            console.log('Product', products);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    getProduct: async(req, res) => {
        try {
            const product = await ProductModel.findOne({ slug: req.params.slug });
            if (!product) {
                res.status(404).json('Không tim thấy product');
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    addProduct: async(req, res) => {
        try {
            const newProduct = req.body;

            const product = new ProductModel(newProduct);
            await product.save();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    updateProduct: async(req, res) => {
        try {
            const updateProduct = req.body;
            const product = await ProductModel.findOneAndUpdate({ _id: req.params.id }, updateProduct, { new: true });
            if (!product) {
                res.status(404).json({ message: 'Không tìm thấy product !' });
            } else {

                await product.save();
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ error: error });
        }
    },
    deleteProduct: async(req, res) => {
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
            if (!deleteProduct) {
                res.status(404).json('Không tìm thấy product')
            } else {
                res.status(200).json('Deleted successfully')
            }
        } catch (err) {
            res.status(500).json({ error: error });
        }
    },

    // [DELETE] /course/:,
    destroyProduct: async(req, res, next) => {
        try {
            const deleteProduct = await ProductModel.delete({ _id: req.params.id });
            if (!deleteProduct) {
                res.status(404).json('Không tìm thấy product để xử lý xóa mềm')
            } else {
                res.status(200).json('Xóa mềm thành công !')
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    // [DELETE] /course/:id/for,
    forceDestroyProduct: async(req, res, next) => {
        try {
            const deleteProduct = await ProductModel.deleteOne({ _id: req.params.id })
            if (!deleteProduct) {
                res.status(404).json('Không tìm thấy product để xử lý xóa hẳn')
            } else {
                res.status(200).json('Deleted successfully')
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    // [PATCH] /course/:id/resto,
    restoreProduct: async(req, res, next) => {
        try {
            const deleteProduct = await ProductModel.restore({ _id: req.params.id })
            if (!deleteProduct) {
                res.status(404).json('Không tìm thấy product để khôi phục')
            } else {
                res.status(200).json('Khôi phục product thành công')
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default productController;