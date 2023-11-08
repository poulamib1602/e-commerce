const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const cartController = require("../controller/cartController");

router.post("/create", verifyToken, cartController.create);

router.put("/:id", verifyTokenAndAuthorization, cartController.update);

router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);

router.get("/find/:userId", verifyTokenAndAuthorization, cartController.userCart);

router.get("/", verifyTokenAndAdmin, cartController.listitems);

module.exports = router;