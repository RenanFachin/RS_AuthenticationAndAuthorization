const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");
const prisma = require('../lib/prisma')


class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    })

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.status(201).json({ token, user });
  }
}

module.exports = SessionsController;