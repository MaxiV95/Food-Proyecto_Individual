const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dietsRouter = require("./handlers/diets");
const recipesRouter = require("./handlers/recipes");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/diets", dietsRouter);
router.use("/recipes", recipesRouter);
module.exports = router;

