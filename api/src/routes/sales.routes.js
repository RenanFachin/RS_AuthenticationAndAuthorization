const { Router } = require("express");
const SalesController = require("../controllers/SalesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const salesRoutes = Router();

const salesController = new SalesController();

// Aplicando um middleware para todas as rotas deste conjunto de rotas
salesRoutes.use(ensureAuthenticated);
salesRoutes.use(verifyUserAuthorization(["admin", "sale"])) // somente o admin tem acesso

salesRoutes.get("/", salesController.index);

module.exports = salesRoutes;