'use strict';

const cakeRecipes = require("./cake-recipes.json");

// Your functions here
function getUniqueAuthors(recipes) {
  const authors = [];
  recipes.forEach(recipe => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
}

function printRecipeNames(recipes) {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => console.log("- " + Name));
}

function getRecipesByAuthor(recipes, author) {
  return recipes.filter(recipe => recipe.Author === author);
}

function getRecipesByIngredient(recipes, ingredient) {
  return recipes.filter(recipe =>
    recipe.Ingredients.some(ing =>
      ing.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
}

function findRecipeByName(recipes, name) {
  const result = recipes.find(recipe =>
    recipe.Name.toLowerCase().includes(name.toLowerCase())
  );
  return result || null;
}

function getAllIngredients(recipes) {
  return recipes.reduce((acc, recipe) => {
    return acc.concat(recipe.Ingredients);
  }, []);
}


// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      const authors = getUniqueAuthors(cakeRecipes);
      console.log("\nUnique Authors:");
      authors.forEach(a => console.log("- " + a));

      break;
    case 2:
      const authorName = prompt("Enter author's name: ");
      const authorRecipes = getRecipesByAuthor(cakeRecipes, authorName);
      console.log(`\nRecipes by ${authorName}:`);
      printRecipeNames(authorRecipes);

      break;
    case 3:
      const ingredient = prompt("Enter ingredient to search: ");
      const recipesWithIngredient = getRecipesByIngredient(cakeRecipes, ingredient);
      console.log(`\nRecipes with '${ingredient}':`);
      printRecipeNames(recipesWithIngredient);

      break;
    case 4:
      const name = prompt("Enter recipe name: ");
      const found = findRecipeByName(cakeRecipes, name);
      if (found) {
        console.log("\nRecipe Found:");
        console.log("Name:", found.Name);
        console.log("Author:", found.Author);
        console.log("Ingredients:", found.Ingredients.join(", "));
        const save = prompt("Save this recipe for ingredients list? (yes/no): ");
        if (save.toLowerCase() === 'yes') {
          savedRecipes.push(found);
          console.log("Recipe saved.");
        }
      } else {
        console.log("Recipe not found.");
      }

        break;
    case 5:
      const ingredients = getAllIngredients(savedRecipes);
      console.log("\nAll Ingredients from Saved Recipes:");
      ingredients.forEach((ing, i) => console.log(`${i + 1}. ${ing}`));
      break;

      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);