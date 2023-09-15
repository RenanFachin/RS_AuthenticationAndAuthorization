const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const prisma = require('../lib/prisma')
const { z } = require("zod")
const { fromZodError } = require('zod-validation-error')

class UsersController {
  async create(request, response) {
    const paramsSchema = z.object({
      name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(3, { message: "Sua senha precisa ter no mínimo 3 caracteres" }),
      role: z.enum(["customer", "admin"]).default("customer")
    })

    try {
      const { name, email, password, role } = paramsSchema.parse(request.body)

      const checkUserExists = await prisma.user.findUnique({
        where: {
          email
        }
      });

      if (checkUserExists !== null) {
        // throw new AppError("Este e-mail já está em uso.");
        return response.status(400).json("Este e-mail já está em uso.");
      }

      const hashedPassword = await hash(password, 8);

      await prisma.User.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: role
        }
      })

      return response.status(201).json();
    } catch (err) {
      const validationError = fromZodError(err);
      return response.status(400).json(validationError.message);
    }
  }
}

module.exports = UsersController;