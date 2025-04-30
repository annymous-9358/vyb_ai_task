import React, { useState } from "react";
import axios from "axios";
import DishInput from "./components/DishInput";
import NutritionResult from "./components/NutritionResult";
import { calculateNutrition } from "./utils/nutritionCalculator";
import {
  mockNutritionDatabase,
  householdMeasurements,
  dishTypes,
} from "./data/nutritionData";

const App = () => {
  const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nutritionResult, setNutritionResult] = useState(null);

  const handleSubmit = async (dishName) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Fetch recipe (ingredient list) - using a mock API call
      const recipeResponse = await fetchRecipe(dishName);

      // Step 2: Process the ingredients and calculate nutrition
      const result = calculateNutrition({
        dishName,
        ingredients: recipeResponse.ingredients,
        nutritionDatabase: mockNutritionDatabase,
        householdMeasurements,
        dishTypes,
      });

      setNutritionResult(result);
    } catch (err) {
      console.error("Error calculating nutrition:", err);
      setError(
        "Failed to calculate nutrition. Please try again with a different dish."
      );
    } finally {
      setLoading(false);
    }
  };

  // Mock API call to fetch recipe - in real implementation, this would call an actual API
  const fetchRecipe = async (dishName) => {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, returning predefined recipes for specific dishes
    // In a real app, you would make an actual API call here
    const mockRecipes = {
      "paneer butter masala": {
        ingredients: [
          { ingredient: "Paneer", quantity: "250g" },
          { ingredient: "Butter", quantity: "2 tbsp" },
          { ingredient: "Tomato", quantity: "3 medium" },
          { ingredient: "Onion", quantity: "1 large" },
          { ingredient: "Cream", quantity: "4 tbsp" },
          { ingredient: "Ginger Garlic Paste", quantity: "1 tbsp" },
          { ingredient: "Red Chili Powder", quantity: "1 tsp" },
          { ingredient: "Garam Masala", quantity: "1 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      },
      "dal tadka": {
        ingredients: [
          { ingredient: "Toor Dal", quantity: "1 cup" },
          { ingredient: "Ghee", quantity: "2 tbsp" },
          { ingredient: "Cumin Seeds", quantity: "1 tsp" },
          { ingredient: "Onion", quantity: "1 medium" },
          { ingredient: "Tomato", quantity: "1 medium" },
          { ingredient: "Green Chili", quantity: "2" },
          { ingredient: "Turmeric Powder", quantity: "1/2 tsp" },
          { ingredient: "Red Chili Powder", quantity: "1/2 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      },
      "aloo gobi": {
        ingredients: [
          { ingredient: "Potato", quantity: "2 medium" },
          { ingredient: "Cauliflower", quantity: "1 small" },
          { ingredient: "Oil", quantity: "2 tbsp" },
          { ingredient: "Cumin Seeds", quantity: "1 tsp" },
          { ingredient: "Onion", quantity: "1 medium" },
          { ingredient: "Turmeric Powder", quantity: "1/2 tsp" },
          { ingredient: "Red Chili Powder", quantity: "1/2 tsp" },
          { ingredient: "Garam Masala", quantity: "1/2 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      },
      "chicken curry": {
        ingredients: [
          { ingredient: "Chicken", quantity: "500g" },
          { ingredient: "Onion", quantity: "2 medium" },
          { ingredient: "Tomato", quantity: "2 medium" },
          { ingredient: "Oil", quantity: "3 tbsp" },
          { ingredient: "Ginger Garlic Paste", quantity: "1 tbsp" },
          { ingredient: "Red Chili Powder", quantity: "1 tsp" },
          { ingredient: "Turmeric Powder", quantity: "1/2 tsp" },
          { ingredient: "Garam Masala", quantity: "1 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      },
      "palak paneer": {
        ingredients: [
          { ingredient: "Spinach", quantity: "500g" },
          { ingredient: "Paneer", quantity: "200g" },
          { ingredient: "Onion", quantity: "1 medium" },
          { ingredient: "Tomato", quantity: "1 small" },
          { ingredient: "Ginger Garlic Paste", quantity: "1 tbsp" },
          { ingredient: "Green Chili", quantity: "2" },
          { ingredient: "Cream", quantity: "2 tbsp" },
          { ingredient: "Garam Masala", quantity: "1/2 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      },
    };

    const lowerCaseDishName = dishName.toLowerCase();

    if (mockRecipes[lowerCaseDishName]) {
      return mockRecipes[lowerCaseDishName];
    } else {
      // For dishes not in our mock data, generate a generic recipe
      // In a real app, this would call a recipe API or ML model
      return {
        ingredients: [
          { ingredient: "Main Ingredient", quantity: "250g" },
          { ingredient: "Onion", quantity: "1 medium" },
          { ingredient: "Tomato", quantity: "1 medium" },
          { ingredient: "Oil", quantity: "2 tbsp" },
          { ingredient: "Spices", quantity: "2 tsp" },
          { ingredient: "Salt", quantity: "to taste" },
        ],
      };
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>VYB AI Nutrition Calculator</h1>
        <p className="subtitle">
          Estimate nutrition values for home-cooked Indian dishes
        </p>
      </header>

      <main>
        <DishInput onSubmit={handleSubmit} />

        {loading && (
          <div className="loader">Calculating nutrition values...</div>
        )}

        {error && <div className="error">{error}</div>}

        {nutritionResult && !loading && (
          <NutritionResult result={nutritionResult} />
        )}
      </main>

      <footer>
        <p>© 2025 VYB AI - India's Smartest Health Assistant</p>
      </footer>
    </div>
  );
};

export default App;
