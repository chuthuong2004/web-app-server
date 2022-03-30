import mongoose from 'mongoose';
const catalogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true });
export const CatalogModel = mongoose.model('Catalog', catalogSchema);