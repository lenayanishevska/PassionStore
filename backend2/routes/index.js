const Router = require("express");
const userRouter = require("./UserRouter");
const shopRouter = require("./ShopRouter");
const adminRouter = require("./AdminRouter");

const router = new Router();

router.use("/users", userRouter);
router.use("/shop", shopRouter);
router.use("/admin", adminRouter);

module.exports = router;
