/**
 * Main function to calculate nutrition for a dish given its ingredients
 */
export const calculateNutrition = ({
  dishName,
  ingredients,
  nutritionDatabase,
  householdMeasurements,
  dishTypes,
}) => {
  try {
    console.log("Starting nutrition calculation for:", dishName);
    console.log("Ingredients:", ingredients);

    // Step 1: Identify the dish type
    const dishType = identifyDishType(dishName, dishTypes);
    console.log("Identified dish type:", dishType);

    // Step 2: Standardize ingredient quantities to grams
    const standardizedIngredients = standardizeIngredients(
      ingredients,
      householdMeasurements
    );
    console.log("Standardized ingredients:", standardizedIngredients);

    // Step 3: Match ingredients to nutrition database
    const matchedIngredients = matchIngredientsToDatabase(
      standardizedIngredients,
      nutritionDatabase
    );
    console.log("Matched ingredients:", matchedIngredients);

    // Step 4: Calculate total nutrition for the recipe
    const totalNutrition = calculateTotalNutrition(
      matchedIngredients,
      nutritionDatabase
    );
    console.log("Total nutrition:", totalNutrition);

    // Step 5: Calculate nutrition per standard serving
    const nutritionPerServing = calculateNutritionPerServing(
      totalNutrition,
      dishType,
      householdMeasurements
    );
    console.log("Nutrition per serving:", nutritionPerServing);

    // Return formatted result
    return {
      dishName,
      dishType,
      estimatedNutritionPerServing: nutritionPerServing,
      ingredientsUsed: standardizedIngredients,
    };
  } catch (error) {
    console.error("Error calculating nutrition:", error);

    // Return a graceful fallback result with warning
    return {
      dishName,
      dishType: "Unknown",
      estimatedNutritionPerServing: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        warning: "Could not calculate nutrition accurately",
      },
      ingredientsUsed: ingredients,
      warning: `Error calculating nutrition: ${error.message}`,
    };
  }
};

/**
 * Identify the dish type from its name by matching against known categories
 */
const identifyDishType = (dishName, dishTypes) => {
  const lowerCaseDishName = dishName.toLowerCase();

  for (const [type, dishes] of Object.entries(dishTypes)) {
    if (
      dishes.some(
        (dish) =>
          lowerCaseDishName.includes(dish) || dish.includes(lowerCaseDishName)
      )
    ) {
      // Return the type with first letter of each word capitalized
      return type
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }

  // Default classification based on keywords in dish name
  if (
    lowerCaseDishName.includes("dal") ||
    lowerCaseDishName.includes("sambar")
  ) {
    return "Dal";
  } else if (
    lowerCaseDishName.includes("chicken") ||
    lowerCaseDishName.includes("mutton") ||
    lowerCaseDishName.includes("fish") ||
    lowerCaseDishName.includes("egg")
  ) {
    return "Non-Veg Curry";
  } else if (
    lowerCaseDishName.includes("paneer") ||
    lowerCaseDishName.includes("curry") ||
    lowerCaseDishName.includes("masala")
  ) {
    return "Wet Sabzi";
  } else {
    return "Dry Sabzi"; // Default fallback
  }
};

/**
 * Standardize ingredient quantities to grams
 */
const standardizeIngredients = (ingredients, householdMeasurements) => {
  return ingredients.map((item) => {
    try {
      const { ingredient, quantity } = item;
      const cleanedQuantity = quantity.trim().toLowerCase();

      console.log(
        `Processing ingredient: ${ingredient}, quantity: ${cleanedQuantity}`
      );

      // If quantity is already in grams, no conversion needed
      if (cleanedQuantity.includes("g") && !cleanedQuantity.includes("kg")) {
        const grams = parseInt(cleanedQuantity.replace(/[^0-9.]/g, "")) || 0;
        console.log(`Parsed grams directly: ${grams}g`);
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      // Handle kilograms
      if (cleanedQuantity.includes("kg")) {
        const kgAmount =
          parseFloat(cleanedQuantity.replace(/[^0-9.]/g, "")) || 0;
        const grams = kgAmount * 1000;
        console.log(`Converted kg to grams: ${kgAmount}kg = ${grams}g`);
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      // Handle tablespoons and teaspoons
      if (
        cleanedQuantity.includes("tbsp") ||
        cleanedQuantity.includes("tablespoon")
      ) {
        const tbspAmount =
          parseFloat(cleanedQuantity.replace(/[^0-9.]/g, "")) || 1;
        const ingredientType = determineIngredientType(ingredient);
        const gramsPerTbsp =
          householdMeasurements.tablespoon.g[ingredientType] || 15;
        const grams = tbspAmount * gramsPerTbsp;
        console.log(
          `Converted tbsp to grams: ${tbspAmount} tbsp = ${grams}g (${ingredientType})`
        );
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      if (
        cleanedQuantity.includes("tsp") ||
        cleanedQuantity.includes("teaspoon")
      ) {
        const tspAmount =
          parseFloat(cleanedQuantity.replace(/[^0-9.]/g, "")) || 1;
        const ingredientType = determineIngredientType(ingredient);
        const gramsPerTsp =
          householdMeasurements.teaspoon.g[ingredientType] || 5;
        const grams = tspAmount * gramsPerTsp;
        console.log(
          `Converted tsp to grams: ${tspAmount} tsp = ${grams}g (${ingredientType})`
        );
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      // Handle cups
      if (cleanedQuantity.includes("cup")) {
        const cupMatch = cleanedQuantity.match(/(\d+\/\d+|\d+\.\d+|\d+)/);
        let cupAmount = 1; // Default to 1 cup if no number specified

        if (cupMatch) {
          const cupStr = cupMatch[0];
          // Handle fractions like 1/2, 1/4, etc.
          if (cupStr.includes("/")) {
            const [numerator, denominator] = cupStr
              .split("/")
              .map((num) => parseInt(num));
            cupAmount = numerator / denominator;
          } else {
            cupAmount = parseFloat(cupStr);
          }
        }

        const ingredientType = determineIngredientType(ingredient);
        const gramsPerCup = householdMeasurements.cup.g[ingredientType] || 240;
        const grams = cupAmount * gramsPerCup;
        console.log(
          `Converted cup to grams: ${cupAmount} cup = ${grams}g (${ingredientType})`
        );
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      // Handle pieces with size indicators
      if (
        cleanedQuantity.includes("piece") ||
        cleanedQuantity.match(/small|medium|large/) ||
        cleanedQuantity.match(/^\d+$/)
      ) {
        let size = "medium"; // Default size
        if (cleanedQuantity.includes("small")) size = "small";
        if (cleanedQuantity.includes("medium")) size = "medium";
        if (cleanedQuantity.includes("large")) size = "large";

        // Extract the count (number of pieces)
        const countMatch = cleanedQuantity.match(/\d+/);
        const count = countMatch ? parseInt(countMatch[0]) : 1;

        // Get the correct weight based on ingredient and size
        let gramsPerPiece = 60; // Default medium piece size

        const lowerIngredient = ingredient.toLowerCase();

        // Try to match more specific weights first
        if (
          lowerIngredient.includes("tomato") &&
          householdMeasurements.piece.g.tomato
        ) {
          gramsPerPiece =
            householdMeasurements.piece.g.tomato[size] ||
            householdMeasurements.piece.g.tomato.medium;
        } else if (
          lowerIngredient.includes("potato") &&
          householdMeasurements.piece.g.potato
        ) {
          gramsPerPiece =
            householdMeasurements.piece.g.potato[size] ||
            householdMeasurements.piece.g.potato.medium;
        } else if (
          lowerIngredient.includes("onion") &&
          householdMeasurements.piece.g.onion
        ) {
          gramsPerPiece =
            householdMeasurements.piece.g.onion[size] ||
            householdMeasurements.piece.g.onion.medium;
        } else if (
          lowerIngredient.includes("chili") &&
          householdMeasurements.piece.g["green chili"]
        ) {
          gramsPerPiece = householdMeasurements.piece.g["green chili"];
        } else if (
          lowerIngredient.includes("garlic") &&
          householdMeasurements.piece.g["garlic clove"]
        ) {
          gramsPerPiece = householdMeasurements.piece.g["garlic clove"];
        } else if (householdMeasurements.piece.g[size]) {
          gramsPerPiece = householdMeasurements.piece.g[size];
        }

        const grams = count * gramsPerPiece;
        console.log(
          `Converted piece to grams: ${count} ${size} ${ingredient} = ${grams}g`
        );
        return {
          ingredient,
          quantity,
          standardizedGrams: grams,
        };
      }

      // Handle 'to taste' (estimate a small amount)
      if (cleanedQuantity.includes("to taste")) {
        console.log(`Estimated 'to taste' as 3g`);
        return {
          ingredient,
          quantity,
          standardizedGrams: 3, // Minimal amount
        };
      }

      // Look for fractions (like 1/2, 1/4)
      if (cleanedQuantity.match(/\d+\/\d+/)) {
        const fractionMatch = cleanedQuantity.match(/(\d+)\/(\d+)/);
        if (fractionMatch) {
          const [_, numerator, denominator] = fractionMatch;
          const numericValue = parseInt(numerator) / parseInt(denominator);
          const estimatedGrams = estimateGramsForIngredient(
            ingredient,
            numericValue.toString()
          );
          console.log(
            `Converted fraction ${numerator}/${denominator} to ${numericValue}, estimated as ${estimatedGrams}g`
          );
          return {
            ingredient,
            quantity,
            standardizedGrams: estimatedGrams,
          };
        }
      }

      // If no matching conversion found, provide an estimate
      // This is a fallback for unknown quantities
      const estimatedGrams = estimateGramsForIngredient(
        ingredient,
        cleanedQuantity
      );
      console.log(
        `Using fallback estimation for ${ingredient}: ${estimatedGrams}g`
      );
      return {
        ingredient,
        quantity,
        standardizedGrams: estimatedGrams,
      };
    } catch (error) {
      console.warn(`Error standardizing ingredient ${item.ingredient}:`, error);
      // Return a fallback with warning
      return {
        ...item,
        standardizedGrams: 50, // Default fallback weight
        warning: "Could not standardize quantity accurately",
      };
    }
  });
};

/**
 * Determine ingredient type for measurement conversions
 */
const determineIngredientType = (ingredient) => {
  const lowerIngredient = ingredient.toLowerCase();

  if (lowerIngredient.includes("oil") || lowerIngredient.includes("ghee")) {
    return "oil";
  }

  if (
    lowerIngredient.includes("powder") ||
    lowerIngredient.includes("masala") ||
    lowerIngredient.includes("salt") ||
    lowerIngredient.includes("spice")
  ) {
    return "powder";
  }

  if (
    lowerIngredient.includes("water") ||
    lowerIngredient.includes("milk") ||
    lowerIngredient.includes("curd") ||
    lowerIngredient.includes("cream")
  ) {
    return "liquid";
  }

  if (lowerIngredient.includes("rice")) {
    return "rice";
  }

  if (lowerIngredient.includes("flour")) {
    return "flour";
  }

  // Default to vegetable for most ingredients
  return "vegetable";
};

/**
 * Estimate grams for an ingredient when no direct conversion is available
 */
const estimateGramsForIngredient = (ingredient, quantity) => {
  const lowerIngredient = ingredient.toLowerCase();

  // Common estimations for main ingredients
  if (
    lowerIngredient.includes("chicken") ||
    lowerIngredient.includes("mutton") ||
    lowerIngredient.includes("paneer") ||
    lowerIngredient.includes("fish")
  ) {
    return 250; // Typical main protein amount for 3-4 people
  }

  if (lowerIngredient.includes("dal") || lowerIngredient.includes("lentil")) {
    return 200; // Typical dal amount for 3-4 people
  }

  if (
    lowerIngredient.includes("vegetable") ||
    lowerIngredient.includes("potato") ||
    lowerIngredient.includes("onion") ||
    lowerIngredient.includes("tomato")
  ) {
    return 150; // Typical vegetable amount
  }

  if (lowerIngredient.includes("spice") || lowerIngredient.includes("masala")) {
    return 5; // Small amount for spices
  }

  // If it's a quantity with a number, try to extract and estimate
  const numMatch = quantity.match(/\d+(\.\d+)?/);
  if (numMatch) {
    const num = parseFloat(numMatch[0]);
    // Scale based on likely ingredient type
    if (
      lowerIngredient.includes("spice") ||
      lowerIngredient.includes("powder")
    ) {
      return num * 5; // 5g per unit for spices
    } else if (
      lowerIngredient.includes("oil") ||
      lowerIngredient.includes("butter")
    ) {
      return num * 15; // 15g per unit for fats
    } else {
      return num * 50; // 50g per unit as general estimate
    }
  }

  // Default fallback
  return 50;
};

/**
 * Match ingredients to the nutrition database, handling synonyms and variations
 */
const matchIngredientsToDatabase = (ingredients, nutritionDatabase) => {
  return ingredients.map((item) => {
    try {
      const { ingredient } = item;
      const lowerIngredient = ingredient.toLowerCase();

      // Direct match in database
      if (nutritionDatabase[lowerIngredient]) {
        return { ...item, match: lowerIngredient };
      }

      // Handle common variations and synonyms
      if (lowerIngredient.includes("paneer"))
        return { ...item, match: "paneer" };
      if (lowerIngredient.includes("chicken"))
        return { ...item, match: "chicken" };
      if (lowerIngredient.includes("potato"))
        return { ...item, match: "potato" };
      if (lowerIngredient.includes("tomato"))
        return { ...item, match: "tomato" };
      if (lowerIngredient.includes("onion")) return { ...item, match: "onion" };
      if (lowerIngredient.includes("chili"))
        return { ...item, match: "green chili" };
      if (
        lowerIngredient.includes("ginger") &&
        lowerIngredient.includes("garlic")
      ) {
        return { ...item, match: "ginger garlic paste" };
      }
      if (lowerIngredient.includes("ginger"))
        return { ...item, match: "ginger" };
      if (lowerIngredient.includes("garlic"))
        return { ...item, match: "garlic" };
      if (lowerIngredient.includes("oil")) return { ...item, match: "oil" };
      if (lowerIngredient.includes("butter"))
        return { ...item, match: "butter" };
      if (lowerIngredient.includes("cream")) return { ...item, match: "cream" };
      if (lowerIngredient.includes("salt")) return { ...item, match: "salt" };
      if (lowerIngredient.includes("turmeric"))
        return { ...item, match: "turmeric powder" };
      if (lowerIngredient.includes("red chili"))
        return { ...item, match: "red chili powder" };
      if (lowerIngredient.includes("garam masala"))
        return { ...item, match: "garam masala" };
      if (lowerIngredient.includes("cumin"))
        return { ...item, match: "cumin seeds" };
      if (
        lowerIngredient.includes("toor") ||
        lowerIngredient.includes("arhar")
      ) {
        return { ...item, match: "toor dal" };
      }
      if (lowerIngredient.includes("moong"))
        return { ...item, match: "moong dal" };
      if (lowerIngredient.includes("chana"))
        return { ...item, match: "chana dal" };
      if (lowerIngredient.includes("spice"))
        return { ...item, match: "spices" };

      // Fuzzy matching - find closest match in the database
      const bestMatch = findClosestMatch(
        lowerIngredient,
        Object.keys(nutritionDatabase)
      );
      if (bestMatch) {
        return { ...item, match: bestMatch };
      }

      // If no match found, return main ingredient as fallback
      return {
        ...item,
        match: "main ingredient",
        warning: "No exact match found in database",
      };
    } catch (error) {
      console.warn(`Error matching ingredient ${item.ingredient}:`, error);
      // Return a fallback with warning
      return {
        ...item,
        match: "main ingredient",
        warning: "Could not match ingredient to database",
      };
    }
  });
};

/**
 * Find the closest matching ingredient in the database
 */
const findClosestMatch = (ingredient, databaseIngredients) => {
  // Simple fuzzy matching based on substring presence
  for (const dbIngredient of databaseIngredients) {
    if (
      ingredient.includes(dbIngredient) ||
      dbIngredient.includes(ingredient)
    ) {
      return dbIngredient;
    }
  }

  // If no match by inclusion, check if any word matches
  const ingredientWords = ingredient.split(" ");
  for (const dbIngredient of databaseIngredients) {
    const dbWords = dbIngredient.split(" ");
    for (const word of ingredientWords) {
      if (
        word.length > 2 &&
        dbWords.some((dbWord) => dbWord.includes(word) || word.includes(dbWord))
      ) {
        return dbIngredient;
      }
    }
  }

  return null;
};

/**
 * Calculate total nutrition for the entire recipe
 */
const calculateTotalNutrition = (matchedIngredients, nutritionDatabase) => {
  // Initialize totals
  const totalNutrition = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  console.log(
    "Calculating total nutrition for ingredients:",
    matchedIngredients
  );

  // Sum up nutrition from all ingredients
  matchedIngredients.forEach((item) => {
    try {
      const { match, standardizedGrams, ingredient } = item;

      if (!match || !nutritionDatabase[match]) {
        console.warn(
          `No nutrition data for ${ingredient}, using default values`
        );
        // Use a default generic ingredient
        const genericNutrition = nutritionDatabase["main ingredient"];
        const scaleFactor = (standardizedGrams || 50) / 100;

        totalNutrition.calories += genericNutrition.calories * scaleFactor;
        totalNutrition.protein += genericNutrition.protein * scaleFactor;
        totalNutrition.carbs += genericNutrition.carbs * scaleFactor;
        totalNutrition.fat += genericNutrition.fat * scaleFactor;
        totalNutrition.fiber += genericNutrition.fiber * scaleFactor;
        return;
      }

      // Ensure standardizedGrams is a valid number
      const validGrams = isNaN(standardizedGrams) ? 50 : standardizedGrams;

      const nutritionPer100g = nutritionDatabase[match];
      const scaleFactor = validGrams / 100; // Scale from per 100g to actual amount

      totalNutrition.calories += nutritionPer100g.calories * scaleFactor;
      totalNutrition.protein += nutritionPer100g.protein * scaleFactor;
      totalNutrition.carbs += nutritionPer100g.carbs * scaleFactor;
      totalNutrition.fat += nutritionPer100g.fat * scaleFactor;
      totalNutrition.fiber += nutritionPer100g.fiber * scaleFactor;
    } catch (error) {
      console.warn(
        `Error calculating nutrition for ${item.ingredient}:`,
        error
      );
      // Use default values as fallback
      totalNutrition.calories += 50; // Default 50 calories per ingredient with error
      totalNutrition.protein += 2;
      totalNutrition.carbs += 5;
      totalNutrition.fat += 2;
    }
  });

  // Ensure no NaN values in the final result
  Object.keys(totalNutrition).forEach((key) => {
    if (isNaN(totalNutrition[key])) {
      console.warn(`NaN detected in ${key}, resetting to 0`);
      totalNutrition[key] = 0;
    }
    // Round values to 1 decimal place
    totalNutrition[key] = Math.round(totalNutrition[key] * 10) / 10;
  });

  return totalNutrition;
};

/**
 * Calculate nutrition per standard serving based on dish type
 */
const calculateNutritionPerServing = (
  totalNutrition,
  dishType,
  householdMeasurements
) => {
  try {
    // Estimate total cooked weight (this is a rough estimate)
    const totalCookedWeight = estimateTotalCookedWeight(dishType);

    // Get standard serving size in grams based on dish type
    const servingSizeGrams = getServingSizeInGrams(
      dishType,
      householdMeasurements
    );

    console.log(
      `Calculating per serving: Total cooked weight: ${totalCookedWeight}g, Serving size: ${servingSizeGrams}g`
    );

    // Calculate the proportion for one serving
    const servingProportion = servingSizeGrams / totalCookedWeight;

    // Scale nutrition values to one serving
    const nutritionPerServing = {
      calories: Math.round(totalNutrition.calories * servingProportion) || 0,
      protein: Math.round(totalNutrition.protein * servingProportion) || 0,
      carbs: Math.round(totalNutrition.carbs * servingProportion) || 0,
      fat: Math.round(totalNutrition.fat * servingProportion) || 0,
      fiber: Math.round(totalNutrition.fiber * servingProportion) || 0,
    };

    // Final check for any NaN values
    Object.keys(nutritionPerServing).forEach((key) => {
      if (isNaN(nutritionPerServing[key])) {
        console.warn(`NaN detected in per-serving ${key}, resetting to 0`);
        nutritionPerServing[key] = 0;
      }
    });

    console.log("Final nutrition per serving:", nutritionPerServing);
    return nutritionPerServing;
  } catch (error) {
    console.error("Error calculating nutrition per serving:", error);
    // Return a fallback with reasonable values
    return {
      calories: Math.round(totalNutrition.calories / 4) || 0, // Assume 4 servings as fallback
      protein: Math.round(totalNutrition.protein / 4) || 0,
      carbs: Math.round(totalNutrition.carbs / 4) || 0,
      fat: Math.round(totalNutrition.fat / 4) || 0,
      fiber: Math.round(totalNutrition.fiber / 4) || 0,
    };
  }
};

/**
 * Estimate total cooked weight of the dish
 */
const estimateTotalCookedWeight = (dishType) => {
  // Typical weights for different dish types (in grams)
  switch (dishType) {
    case "Wet Sabzi":
      return 800; // Typically around 800g for 4 people
    case "Dry Sabzi":
      return 600; // Typically around 600g for 4 people
    case "Dal":
      return 1000; // Typically around 1000g for 4 people
    case "Non-Veg Curry":
      return 1000; // Typically around 1000g for 4 people
    case "Rice":
      return 800; // Typically around 800g for 4 people
    case "Bread":
      return 400; // Typically around 400g for 4 people (8 rotis)
    case "Dessert":
      return 600; // Typically around 600g for 4 people
    default:
      return 800; // Default fallback
  }
};

/**
 * Get standard serving size in grams based on dish type
 */
const getServingSizeInGrams = (dishType, householdMeasurements) => {
  const lowerCaseDishType = dishType.toLowerCase();

  // Get the katori measurement if available
  if (householdMeasurements.katori.g[lowerCaseDishType]) {
    return householdMeasurements.katori.g[lowerCaseDishType];
  }

  // Default serving sizes based on dish type
  switch (dishType) {
    case "Wet Sabzi":
      return 180; // 1 katori (~180g)
    case "Dry Sabzi":
      return 150; // 1 katori (~150g)
    case "Dal":
      return 200; // 1 katori (~200g)
    case "Non-Veg Curry":
      return 200; // 1 katori (~200g)
    case "Rice":
      return 150; // 1 katori (~150g)
    case "Bread":
      return 30; // 1 piece (~30g)
    case "Dessert":
      return 100; // 1 serving (~100g)
    default:
      return 150; // Default fallback
  }
};
