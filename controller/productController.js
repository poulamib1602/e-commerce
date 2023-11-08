const Product = require("../models/product");
const response = require('../response');

const create = async (req, res) => {
    const newprod = new Product(req.body);
    console.log("...", newprod)
    try {
        const savedProduct = await newprod.save();
        response.success(res, savedProduct)
    } catch (error) {
        response.error(res, error, 500);
    }
};

const updateprod = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        response.success(res, updatedProduct);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const deleteprod = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        response.success(res, "Product has been deleted...");
    } catch (error) {
        response.error(res, error, 500);
    }
};

const allprod = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        response.success(res, product);
    } catch (error) {
        response.error(res, error, 500);
    }
};

module.exports = {
    create,
    allprod,
    deleteprod,
    updateprod
}


