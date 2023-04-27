/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("step_ingredients").truncate();
  await knex("ingredients").truncate();
  await knex("steps").truncate();
  await knex("recipes").truncate();
  await knex("recipes").insert([
    { recipeId: 1, recipeName: "Bolonez Makarna" },
    { recipeId: 2, recipeName: "Omlet" },
    { recipeId: 3, recipeName: "Tarhana Corbasi" },
  ]);
  await knex("steps").insert([
    {
      stepId: 1,
      stepInstruction: "Buyuk bir tencereyi ocaga koy",
      stepNumber: 1,
      recipeId: 1,
    },
    {
      stepId: 2,
      stepInstruction: "1 yemek kasigi zeytinyagi ekle",
      stepNumber: 2,
      recipeId: 1,
    },
    {
      stepId: 3,
      stepInstruction: "Omlet tavasini ocaga koy",
      stepNumber: 1,
      recipeId: 2,
    },
    {
      stepId: 4,
      stepInstruction: "2 yumurta kir",
      stepNumber: 2,
      recipeId: 2,
    },
    {
      stepId: 5,
      stepInstruction: "Corba tenceresini ocaga koy",
      stepNumber: 1,
      recipeId: 3,
    },
    {
      stepId: 6,
      stepInstruction: "1 yemek kasigi tereyagi ve 1 yemek kasigi salca ekle",
      stepNumber: 2,
      recipeId: 3,
    },
    {
      stepId: 7,
      stepInstruction: "3 dis ince dogranmis sarimsaklari ekle",
      stepNumber: 3,
      recipeId: 3,
    },
  ]);
  await knex("ingredients").insert([
    { ingredientId: 1, ingredientName: "Zeytinyagi" },
    { ingredientId: 2, ingredientName: "Yumurta" },
    { ingredientId: 3, ingredientName: "Tereyagi" },
    { ingredientId: 4, ingredientName: "Salca" },
    { ingredientId: 5, ingredientName: "Sarimsak" },
  ]);
  await knex("step_ingredients").insert([
    { stepId: 2, ingredientId: 1, ingredientAmount: 0.65 },
    { stepId: 4, ingredientId: 2, ingredientAmount: 2 },
    { stepId: 6, ingredientId: 3, ingredientAmount: 0.65 },
    { stepId: 6, ingredientId: 4, ingredientAmount: 0.95 },
    { stepId: 7, ingredientId: 5, ingredientAmount: 1.25 },
  ]);
};
