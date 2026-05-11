const { default: mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: String,
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    size: {
        type: Number,
        default: 1
    },
    clothings: {
        type: Number,
        default: 1
    },
    color: {
        type: Number,
        default: 1
    },
    fit: {
        type: Number,
        default: 1
    },
    gender: {
        type: Number,
        default: 1
    },
    style: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    },
})

productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;