const Router = require("express");
const productController = require("../controllers/ProductController");
const categoryController = require("../controllers/CategoryController");
const expensesController = require("../controllers/ExpensesController");
const pageController = require("../controllers/PageController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

const router = new Router();

router.get("/products/list", wrapAsync(productController.list));
router.post("/products/addProductToCart", authMiddleware, wrapAsync(productController.addToCart));
router.get("/products/cartProductList", authMiddleware, wrapAsync(productController.cartList));
router.get("/products/createOrder", authMiddleware, wrapAsync(productController.createOrder));
router.post("/products/create", authMiddleware, wrapAsync(productController.create));
router.get("/products/getById", wrapAsync(productController.getById));
router.delete("/products/deleteFromCart", authMiddleware, wrapAsync(productController.deleteFromCart));

router.get("/categories/list", wrapAsync(categoryController.list));
router.post("/categories/create", authMiddleware, wrapAsync(categoryController.create));

router.get("/expenses/list", wrapAsync(expensesController.list));
router.post("/expenses/create", authMiddleware, wrapAsync(expensesController.create));
router.post("/expenses/createCategory", authMiddleware, wrapAsync(expensesController.createCategory));

router.get("/pages/list", authMiddleware, wrapAsync(pageController.list));
router.get("/pages/item", wrapAsync(pageController.item));
router.post("/pages/create", authMiddleware, wrapAsync(pageController.create));

router.post("/attributes/create", authMiddleware, wrapAsync(pageController.createAttribute));
router.post("/options/create", authMiddleware, wrapAsync(pageController.createOption));

module.exports = router;
