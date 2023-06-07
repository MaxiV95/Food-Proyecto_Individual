/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Recipe, Diet, conn } = require("../../src/db");
const { Op } = require("sequelize");

const agent = session(app);
const newRecipe = {
  title: "Test Milanesa a la napolitana",
  summary:
    "Una deliciosa milanesa de carne vacuna con jamón, queso y salsa de tomate.",
  healthScore: 7.5,
  steps: [
    "Aplanar la carne",
    "Empanar la carne",
    "Freír la carne",
    "Agregar el jamón y el queso",
    "Agregar la salsa de tomate",
    "Gratinar al horno",
  ],
  image:
    "https://www.recetas360.com/wp-content/uploads/2018/12/milanesa-napolitana-1200x720.jpg",
  diets: [],
};
const diets = [
  "Test dairy free",
  "Test gluten free",
  "Test keto",
  "Test lacto ovo vegetarian",
  "Test lacto Vegetarian",
  "Test low FODMAP",
  "Test ovo vegetarian",
  "Test paleo",
  "Test pescetarian",
  "Test primal",
  "Test vegan",
  "Test vegetarian",
  "Test Whole30",
];

xdescribe("Recipes routes", () => {
  before(async () => {
    await conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await conn.sync({ alter: true });
  });

  describe("\n    + GET /recipes/:id", () => {
    beforeEach(async () => {
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
      // Crear una nueva receta
      await Recipe.create(newRecipe);
    });

    it("should respond with 200 status", async () => {
      const recipe1 = await Recipe.findOne({
        where: { title: "Test Milanesa a la napolitana" },
      });
      const res = await agent.get(`/recipes/${recipe1.id}`);
      expect(res.status).to.equal(200);
    });
    it("should return an object with the recipe's information", async () => {
      const recipe2 = await Recipe.findOne({
        where: { title: "Test Milanesa a la napolitana" },
      });
      const res = await agent.get(`/recipes/${recipe2.id}`);
      expect(res.body).to.deep.equal({
        id: recipe2.id,
        title: recipe2.title,
        summary: recipe2.summary,
        healthScore: recipe2.healthScore,
        steps: recipe2.steps,
        image: recipe2.image,
        glutenFree: false,
        vegan: false,
        vegetarian: false,
        diets: [],
      });
    });
    it("should respond with 404 status if params is not a valid id", async () => {
      const response = await agent.get("/recipes/1a2s3d");
      expect(response.statusCode).to.equal(404);
    });

    after(async () => {
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
    });
  });

  describe("\n    + GET /recipes", () => {
    it("should get status 200", async () =>
      await agent.get("/recipes").expect(200));

    after(async () => {
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
    });
  });

  describe("\n    + POST /recipes", () => {
    beforeEach(async () => {
      // Eliminar cualquier receta existente con el mismo título
      await Recipe.destroy({ where: { title: newRecipe.title } });
      // Crear las dietas si no existen
      await Promise.all(
        diets.map(async (diet) => {
          await Diet.findOrCreate({ where: { name: diet } });
        })
      );
    });
    it("should respond with 500 status if data is missing", async () => {
      const res = await agent.post("/recipes").send({});
      expect(res.statusCode).to.equal(500);
      const res1 = await agent.post("/recipes").send({ title: "Ice Cream" });
      expect(res1.statusCode).to.equal(500);
    });
    it("should respond with 200 status", async () => {
      const res2 = await agent
        .post("/recipes")
        .send({ ...newRecipe, diets: [] });
      expect(res2.status).to.equal(200);
      const res3 = await agent.get(`/recipes/${res2.body.id}`);
      expect(res3.status).to.equal(200);
    });

    after(async () => {
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Diet.destroy({ where: { name: { [Op.like]: "%Test%" } } });
    });
  });
});
