/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Recipe, Diet, conn } = require("../../src/db");
const { Op } = require("sequelize");

const agent = session(app);

xdescribe("Diets routes", () => {
  before(async () => {
    await conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await conn.sync({ alter: true });
  });

  describe("\n    + GET /diets", () => {
    it("should respond with 200 status", async () => {
      const res = await agent.get("/diets");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("id");
      expect(res.body[0]).to.have.property("name").to.be.a("string");
    });
    after(async () => {
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
      // Eliminar cualquier receta existente creada con palabra 'Test'
      await Diet.destroy({ where: { name: { [Op.like]: "%Test%" } } });
    });
  });
});
