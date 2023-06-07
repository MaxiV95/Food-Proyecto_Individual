const { Recipe, Diet, conn } = require("../../src/db.js");
const { expect } = require("chai");
const { Op } = require("sequelize");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Recipe.sync({ alter: true }));

  describe("\n    + Attributes definition", () => {
    it("should have the following attributes: id, title, image, vegetarian, vegan, glutenFree, summary, healthScore and steps", () => {
      expect(Recipe.tableAttributes).to.have.property("id");
      expect(Recipe.tableAttributes).to.have.property("title");
      expect(Recipe.tableAttributes).to.have.property("image");
      expect(Recipe.tableAttributes).to.have.property("vegetarian");
      expect(Recipe.tableAttributes).to.have.property("vegan");
      expect(Recipe.tableAttributes).to.have.property("glutenFree");
      expect(Recipe.tableAttributes).to.have.property("summary");
      expect(Recipe.tableAttributes).to.have.property("healthScore");
      expect(Recipe.tableAttributes).to.have.property("steps");
    });

    it("should have allowNull: false constraint on title, image, summary and steps attributes", () => {
      expect(Recipe.tableAttributes.title.allowNull).to.be.false;
      expect(Recipe.tableAttributes.image.allowNull).to.be.false;
      expect(Recipe.tableAttributes.summary.allowNull).to.be.false;
      expect(Recipe.tableAttributes.steps.allowNull).to.be.false;
    });

    it("should have defaultValue: false constraint on vegetarian, vegan and glutenFree attributes", () => {
      expect(Recipe.tableAttributes.vegetarian.defaultValue).to.be.false;
      expect(Recipe.tableAttributes.vegan.defaultValue).to.be.false;
      expect(Recipe.tableAttributes.glutenFree.defaultValue).to.be.false;
    });

    it("should have min: 0 and max: 100 constraint on healthScore attribute", () => {
      expect(Recipe.tableAttributes.healthScore.validate.min).to.equal(0);
      expect(Recipe.tableAttributes.healthScore.validate.max).to.equal(100);
    });
  });

  describe("\n    + Validators", () => {
    beforeEach(() => Recipe.sync({ alter: true }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({ title: "Test Milanesa a la napolitana" });
      });
    });
    describe("image", () => {
      it("should throw an error if image is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid image")))
          .catch(() => done());
      });
      it("should work when its a valid url", () => {
        Recipe.create({
          title: "Test Milanesa a la napolitana",
          image: "https://www.example.com/image.jpg",
        });
      });
    });
    describe("healthScore", () => {
      it("should throw an error if healthScore is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid healthScore")))
          .catch(() => done());
      });
      it("should throw an error if healthScore is not in range 0-100", (done) => {
        Recipe.create({ title: "Test Milanesa a la napolitana", healthScore: 101 })
          .then(() => done(new Error("healthScore should be in range 0-100")))
          .catch(() => done());
      });
      it("should work when its a valid healthScore", () => {
        Recipe.create({ title: "Test Milanesa a la napolitana", healthScore: 90 });
      });
    });
    describe("steps", () => {
      it("should throw an error if steps is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid steps array")))
          .catch(() => done());
      });
      it("should work when its a valid steps array", () => {
        Recipe.create({
          title: "Test Milanesa a la napolitana",
          steps: ["Paso 1", "Paso 2"],
        });
      });
    });
  });

  after(async () => {
    // Eliminar cualquier receta existente creada con palabra 'Test'
    await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
    // Eliminar cualquier receta existente creada con palabra 'Test'
    await Diet.destroy({ where: { name: { [Op.like]: "%Test%" } } });
  });
});

describe("\n    + Recipe and Diet models", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Association", () => {
    let recipe, diet;
    beforeEach(async () => {
      await conn.sync({ alter: true });

      recipe = await Recipe.create({
        title: "Test Spaghetti with meatballs",
        image: "https://www.example.com/spaghetti.jpg",
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: "This is a delicious recipe for spaghetti with meatballs",
        healthScore: 80,
        steps: [
          "Cook the spaghetti",
          "Make the meatballs",
          "Combine and serve",
        ],
      });

      diet = await Diet.create({
        name: "Test Ketogenic",
      });
    });

    it("Recipe and Diet should be associated", async () => {
      await recipe.addDiet(diet);
      const recipeDiets = await recipe.getDiets();
      expect(recipeDiets).to.have.lengthOf(1);
      expect(recipeDiets[0].name).to.equal("Test Ketogenic");

      const dietRecipes = await diet.getRecipes();
      expect(dietRecipes).to.have.lengthOf(1);
      expect(dietRecipes[0].title).to.equal("Test Spaghetti with meatballs");
    });
  });

  after(async () => {
    // Eliminar cualquier receta existente creada con palabra 'Test'
    await Recipe.destroy({ where: { title: { [Op.like]: "%Test%" } } });
    // Eliminar cualquier receta existente creada con palabra 'Test'
    await Diet.destroy({ where: { name: { [Op.like]: "%Test%" } } });
  });
});