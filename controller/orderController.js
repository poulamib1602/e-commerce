const Order = require("../models/order");
const response = require('../response');
const create = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        response.success(res, savedOrder);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const update = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        response.success(res, updatedOrder);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const deleteorder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        response.success(res, "orders deleted");
    } catch (error) {
        response.error(res, error, 500);
    }
};
const UserOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        response.success(res, orders);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        response.success(res, orders);
    } catch (error) {
        response.error(res, error, 500);
    }
};

const userMonthlyInvest = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    create,
    update,
    deleteorder,
    UserOrder,
    allOrders,
    userMonthlyInvest
}