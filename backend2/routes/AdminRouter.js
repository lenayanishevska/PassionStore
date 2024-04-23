const Router = require("express");
const monthController = require("../controllers/AdminController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

const router = new Router();

router.get("/monthInfo"/*, authMiddleware*/, wrapAsync(monthController.monthInfo));

module.exports = router;
