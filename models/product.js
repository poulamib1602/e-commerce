const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true,
        },
        category:
        {
            type: String,
        },
        image:
        {
            type: String
        },
        price:
        {
            type: Number,
            required: true
        },
        cart: {
            type: Array
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);