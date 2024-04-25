const Router = require("express");
const adminController = require("../controllers/AdminController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

const router = new Router();

router.get("/monthInfo"/*, authMiddleware*/, wrapAsync(adminController.monthInfo));
router.get("/saleChart"/*, authMiddleware*/, wrapAsync(adminController.saleChart));
router.get("/orders"/*, authMiddleware*/, wrapAsync(adminController.orders));

module.exports = router;
