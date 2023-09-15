const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const prisma = require('../lib/prisma')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (checkUserExists !== null) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })

    return response.status(201).json();
  }
}

module.exports = UsersController;