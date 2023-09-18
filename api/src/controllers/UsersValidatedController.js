const prisma = require('../lib/prisma')

class UsersValidatedController {
  async index(request, response) {
    const { user } = (request)

    const checkUserExists = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (checkUserExists === 0) {
      // throw new AppError("Este e-mail já está em uso.");
      return response.status(401).json("Não autorizado");
    }

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;