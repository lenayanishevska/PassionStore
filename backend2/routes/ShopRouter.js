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
router.post("/products/createOrder", authMiddleware, wrapAsync(productController.createOrder));
router.post("/products/create", authMiddleware, wrapAsync(productController.create));
router.post("/products/createProduct", wrapAsync(productController.createProduct));
router.get("/products/getById", wrapAsync(productController.getById));
router.delete("/products/deleteFromCart", authMiddleware, wrapAsync(productController.deleteFromCart));
router.get("/products/manufacturerList", wrapAsync(productController.manufacturerlist));
router.get("/products/sizeList", wrapAsync(productController.sizelist));
router.get("/products/attributeList", wrapAsync(productController.attributelist));

router.get("/categories/list", wrapAsync(categoryController.list));
router.post("/categories/create", authMiddleware, wrapAsync(categoryController.create));

router.get("/expenses/categoriesList", wrapAsync(expensesController.categoriesList));
router.post("/expenses/create", authMiddleware, wrapAsync(expensesController.create));
router.post("/expenses/createCategory", authMiddleware, wrapAsync(expensesController.createCategory));

router.get("/pages/list", authMiddleware, wrapAsync(pageController.list));
router.get("/pages/item", wrapAsync(pageController.item));
router.post("/pages/create", authMiddleware, wrapAsync(pageController.create));

router.post("/attributes/create", wrapAsync(productController.createAttribute));
router.post("/sizes/create", wrapAsync(productController.createSize));
router.post("/manufacturers/create", wrapAsync(productController.createManufacturer));
router.post("/sizes/createProductSize", authMiddleware, wrapAsync(productController.createProductSize));


module.exports = router;
