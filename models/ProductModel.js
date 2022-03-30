import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    desProduct: {
        type: String,
        required: true,
    },
    detail: [{
        size: {
            type: String,
        },
        detailColor: [{
            color: { type: String },
            amount: { type: Number },
        }],
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    attachment: {
        type: [String],
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    keywords: {
        type: [String],
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    slug: { type: String, slug: 'name', unique: true },

}, { timestamps: true });
// Add plugin
mongoose.plugin(slug);
productSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
export const ProductModel = mongoose.model('Product', productSchema);