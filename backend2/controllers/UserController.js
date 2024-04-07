const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { fullName, email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Wrong email or password!"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("The user already exist!"));
    }

    const [firstName, lastName] = fullName.split(" ");

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashPassword,
    });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: token,
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Wrong password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: token,
    });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
