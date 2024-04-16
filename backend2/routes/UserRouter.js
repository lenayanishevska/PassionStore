const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");
const wrapAsync = require('../middleware/WrapAsync');

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/addAddress", wrapAsync(userController.addAddress));
router.get("/getAddress", wrapAsync(userController.getUserAddress));
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
