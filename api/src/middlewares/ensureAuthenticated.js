const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers

  if (!authHeader.cookie) {
    throw new AppError('JWT token não informado', 401);
  }

  // Como fica armazenado nos cookie: "token=dijfdjsife9210341dh"

  const [, token] = authHeader.split('token=');

  try {
    // Capturando o role que vem da rota de criação de session
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}

module.exports = ensureAuthenticated;