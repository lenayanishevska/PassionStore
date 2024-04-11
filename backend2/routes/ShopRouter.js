const Router = require("express");
const productController = require("../controllers/ProductController");
const categoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

const router = new Router();

router.get("/products/list", wrapAsync(productController.list));
router.post("/products/create", authMiddleware, wrapAsync(productController.create));
router.get("/categories/list", wrapAsync(categoryController.list));
router.post("/categories/create", authMiddleware, wrapAsync(categoryController.create));

module.exports = router;
