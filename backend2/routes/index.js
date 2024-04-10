const Router = require("express");
const userRouter = require("./UserRouter");
const shopRouter = require("./ShopRouter");

const router = new Router();

router.use("/users", userRouter);
router.use("/shop", shopRouter);

module.exports = router;
