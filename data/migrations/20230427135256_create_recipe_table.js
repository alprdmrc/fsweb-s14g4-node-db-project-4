/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipeId");
      tbl.string("recipeName", 128).unique().notNullable();
      tbl.timestamps({ useCamelCase: true });
    })
    .createTable("steps", (tbl) => {
      tbl.increments("stepId");
      tbl.string("stepInstruction", 128).notNullable();
      tbl.integer("stepNumber").notNullable();
      tbl
        .integer("recipeId")
        .unsigned()
        .notNullable()
        .references("recipeId")
        .inTable("recipes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredientId");
      tbl.string("ingredientName", 128).notNullable();
    })
    .createTable("step_ingredients", (tbl) => {
      tbl
        .integer("stepId")
        .unsigned()
        .notNullable()
        .references("stepId")
        .inTable("steps")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("ingredientId")
        .unsigned()
        .references("ingredientId")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.primary(["stepId", "ingredientId"]);
      tbl.float("ingredientAmount").unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("step_ingredients")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes");
};
