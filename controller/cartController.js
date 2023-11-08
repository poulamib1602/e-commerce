const Cart = require("../models/cart");
const response = require('../response');

const create = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        response.success(res, { "message": "Added to cart", savedCart });
    } catch (error) {
        response.error(res, error, 500);
    }
};


const update = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        response.success(res, { "message": "updated to cart", updatedCart });
    } catch (error) {
        response.error(res, error, 500);
    }
};

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        response.success(res, "Cart has been deleted...");
    } catch (error) {
        response.error(res, error, 500);
    }
};

const userCart = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.userId });
        response.success(res, { "message": "your cart items.", cart });
    } catch (error) {
        response.error(res, error, 500);
    }
};

const listitems = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = {
    create,
    update,
    deleteCart,
    userCart,
    listitems
}