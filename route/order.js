const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const orderController = require("../controller/orderController");

router.post("/", verifyToken, orderController.create);

router.put("/:id", verifyTokenAndAdmin, orderController.update);

router.delete("/:id", verifyTokenAndAdmin, orderController.deleteorder);

router.get("/find/:userId", verifyTokenAndAuthorization, orderController.UserOrder);

router.get("/", verifyTokenAndAdmin, orderController.allOrders);

// GET MONTHLY invest os a user

// router.get("/invest", verifyTokenAndAdmin, orderController.userMonthlyInvest);

module.exports = router;