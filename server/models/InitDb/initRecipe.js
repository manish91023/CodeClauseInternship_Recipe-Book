// when we needs these data we have to put it in our index.js
const fetchAndStoreRecipes = async () => {
    const userOwnerId = "65e7675dc6a66c4a53e73f43";
    try {
       const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=fish');
       const meals = response.data.meals;
   
       const recipeData = meals.map(meal => ({
         name: meal.strMeal,
         ingredients: `${meal.strIngredient1} ${meal.strIngredient2} ${meal.strIngredient3} ${meal.strIngredient4} ${meal.strIngredient5} ${meal.strIngredient6} ${meal.strIngredient7} ${meal.strIngredient8} ${meal.strIngredient9} ${meal.strIngredient10}
         ${meal.strIngredient11} ${meal.strIngredient12} ${meal.strIngredient13} ${meal.strIngredient14} ${meal.strIngredient15} ${meal.strIngredient16} ${meal.strIngredient17} ${meal.strIngredient18} `,
         instructions: meal.strInstructions,
         imageUrl: meal.strMealThumb,
         userOwner: userOwnerId,
       }));
   
       // Insert the recipe data into the database
       const result = await Recipe.insertMany(recipeData);
       console.log(`Inserted ${result.length} recipes into the database.`);
    } catch (error) {
       console.error(error);
    }
   };
   
   // Call the function to fetch and store recipes
   fetchAndStoreRecipes();
   