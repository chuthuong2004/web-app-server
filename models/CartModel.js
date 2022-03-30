import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,

        },
        size: {
            type: String,

        },
        color: {
            type: String,
        }
    }, ],

}, { timestamps: true });
export const CartModel = mongoose.model('Cart', cartSchema);