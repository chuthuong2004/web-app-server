import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }, ]
}, { timestamps: true });
export const CategoryModel = mongoose.model('Category', categorySchema);