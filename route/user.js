const router = require("express").Router();
const Order = require("../models/order");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const user = require("../models/user");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return response.error(res, error, 500);
            }
        }
        try {
            const users = await user.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            response.success(res, "Account has been updated");
        } catch (error) {
            response.error(res, error, 500);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await user.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (error) {
            return response.error(res, error, 500);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

module.exports = router
