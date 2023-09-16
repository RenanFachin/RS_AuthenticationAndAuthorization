const AppError = require('../utils/AppError')

// roleToVerify = admin ou customer, mas desta forma, só uma única role poderia ter acesso aos recursos das rota

// Para que 2 roles diferentes consigam acessar um recurso, é necessário criar um array e fazer a verificação a partir do includes

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401)
    }

    return next()
  }
}


module.exports = verifyUserAuthorization;