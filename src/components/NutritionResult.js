import React from "react";

const NutritionResult = ({ result }) => {
  const { dishName, dishType, estimatedNutritionPerServing, ingredientsUsed } =
    result;

  return (
    <div className="nutrition-result">
      <h2>Nutrition Results</h2>

      <div className="result-card">
        <h3>{dishName.charAt(0).toUpperCase() + dishName.slice(1)}</h3>
        <p>Dish Type: {dishType}</p>

        <div className="nutrition-values">
          <div className="nutrition-item">
            <span>Calories:</span>
            <span>{estimatedNutritionPerServing.calories} kcal</span>
          </div>
          <div className="nutrition-item">
            <span>Protein:</span>
            <span>{estimatedNutritionPerServing.protein} g</span>
          </div>
          <div className="nutrition-item">
            <span>Carbs:</span>
            <span>{estimatedNutritionPerServing.carbs} g</span>
          </div>
          <div className="nutrition-item">
            <span>Fat:</span>
            <span>{estimatedNutritionPerServing.fat} g</span>
          </div>
          {estimatedNutritionPerServing.fiber && (
            <div className="nutrition-item">
              <span>Fiber:</span>
              <span>{estimatedNutritionPerServing.fiber} g</span>
            </div>
          )}
        </div>

        <div className="ingredients-list">
          <h4>Ingredients Used in Calculation:</h4>
          <ul>
            {ingredientsUsed.map((item, index) => (
              <li key={index}>
                {item.ingredient}: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="note">
        <p>
          <strong>Note:</strong> Values are estimates based on standard
          household measurements and typical recipes.
        </p>
        <p>
          Standard serving size for {dishType}:{" "}
          {getServingSizeForDishType(dishType)}
        </p>
      </div>
    </div>
  );
};

// Helper function to display the serving size based on dish type
const getServingSizeForDishType = (dishType) => {
  const servingSizes = {
    "Wet Sabzi": "1 katori (~180g)",
    "Dry Sabzi": "1 katori (~150g)",
    Dal: "1 katori (~200g)",
    "Non-Veg Curry": "1 katori (~200g)",
    Rice: "1 katori (~150g)",
    Bread: "1 piece (~30g)",
    Dessert: "1 serving (~100g)",
  };

  return servingSizes[dishType] || "1 serving";
};

export default NutritionResult;
