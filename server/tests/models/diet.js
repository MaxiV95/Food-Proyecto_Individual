const { Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { Op } = require("sequelize");

describe("Diet model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Diet.sync({ alter: true }));

  describe("\n    + Attributes definition", () => {
    it("should have the following attributes: id, name", () => {
      expect(Diet.tableAttributes).to.have.property("id");
      expect(Diet.tableAttributes).to.have.property("name");
    });

    it("should have allowNull: false constraint on name attributes", () => {
      expect(Diet.tableAttributes.name.allowNull).to.be.false;
    });
  });
  
  describe("\n    + Validators", () => {
    beforeEach(() => Diet.sync({ alter: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Diet.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Diet.create({ name: "Test Vegetarian" });
      });
    });
  });

  after(async () => {
    // Eliminar cualquier receta existente creada con palabra 'Test'
    await Diet.destroy({ where: { name: { [Op.like]: "%Test%" } } });
  });
});