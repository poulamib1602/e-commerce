const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const userController = require("../controller/userController");

router.put("/:id", verifyTokenAndAuthorization, userController.update);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteuser);

module.exports = router
