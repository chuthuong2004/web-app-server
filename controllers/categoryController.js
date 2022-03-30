import { CategoryModel } from "../models/CategoryModel.js";
const categoryController = {
    getAllCategory: async(req, res) => {
        try {
            const categories = await CategoryModel.find();
            console.log('Category', categories);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    getCategory: async(req, res) => {
        try {
            const category = await CategoryModel.findById(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    addCategory: async(req, res) => {
        try {
            const newCategory = req.body;
            const category = new CategoryModel(newCategory);
            await category.save();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },
    updateCategory: async(req, res) => {
        try {
            const updateCategory = req.body;
            const category = await CategoryModel.findOneAndUpdate({ _id: req.params.id }, updateCategory, { new: true });
            await category.save();
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json({ error: error });
        }
    },
    deleteCategory: async(req, res) => {
        try {
            await CategoryModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Deleted category successfully' })
        } catch (err) {
            res.status(500).json({ error: error });
        }
    }
}
export default categoryController;