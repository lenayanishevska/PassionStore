const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { User, UserAddress } = require("../models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { fullName, email, password, is_admin} = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Wrong email or password!"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("The user already exist!"));
    }

    const [first_name, last_name] = fullName.split(" ");

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
      is_admin,
    });
    const token = generateJwt(user.id, user.email);
    return res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      token: token,
    });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.internal("User not found"));
    }

    const userAddressId = user.UserAddressId;
    const userAddress = await UserAddress.findByPk(userAddressId);

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal("Wrong password"));
    }

    const token = generateJwt(user.id, user.email);

    return res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      is_admin: user.is_admin,
      address: userAddress,
      token: token,
    });
  }

  async addAddress(req, res, next) {
    const bodySchema = Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      zipcode: Joi.string().required(),
      userId: Joi.number().required(),
    });

    const { address, city, country, zipcode, userId} = await bodySchema.validateAsync(req.body);

    const user = await User.findOne( { where: { id: userId } });
    if(user.UserAddressId) {
      throw new Error('Address have already been added!');
    }

    const userAddress = await UserAddress.create({
      address: address,
      city: city,
      country: country,
      zipcode: zipcode
    });

    if (!userAddress) {
      throw new Error('Can\'t add address');
    }

    await User.update(
      { UserAddressId: userAddress.id }, // Поле UserAddressId у таблиці користувачів
      { where: { id: userId } } // Умова для оновлення запису
    );

    const userWithAddress = await User.findOne({ where: { id: userId }, include: UserAddress });

    return userWithAddress;
  }



  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({ token });
  }
}

module.exports = new UserController();
