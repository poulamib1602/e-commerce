const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const productController = require("../controller/productController");

router.post("/create", verifyTokenAndAdmin, productController.create);

router.put("/:id", verifyTokenAndAdmin, productController.updateprod);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteprod);

router.get("/find/:id", productController.allprod);

module.exports = router;