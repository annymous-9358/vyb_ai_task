// Sample nutrition database for common Indian ingredients (per 100g)
export const mockNutritionDatabase = {
  // Dairy products
  paneer: { calories: 265, protein: 18.3, carbs: 3.1, fat: 20.8, fiber: 0 },
  milk: { calories: 67, protein: 3.2, carbs: 4.8, fat: 4.1, fiber: 0 },
  curd: { calories: 60, protein: 3.3, carbs: 4.4, fat: 3.5, fiber: 0 },
  cream: { calories: 340, protein: 2.1, carbs: 2.8, fat: 36.2, fiber: 0 },
  butter: { calories: 717, protein: 0.1, carbs: 0.1, fat: 81.1, fiber: 0 },
  ghee: { calories: 900, protein: 0, carbs: 0, fat: 100, fiber: 0 },

  // Vegetables
  potato: { calories: 77, protein: 2, carbs: 17, fat: 0.1, fiber: 2.2 },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  onion: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, fiber: 1.7 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
  cauliflower: { calories: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2.5 },
  "green chili": { calories: 40, protein: 2, carbs: 8.8, fat: 0.2, fiber: 1.5 },
  ginger: { calories: 80, protein: 1.8, carbs: 17.8, fat: 0.8, fiber: 2 },
  garlic: { calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5, fiber: 2.1 },
  "ginger garlic paste": {
    calories: 112,
    protein: 3.2,
    carbs: 24.6,
    fat: 0.6,
    fiber: 2.2,
  },

  // Legumes and Lentils
  "toor dal": {
    calories: 343,
    protein: 22.2,
    carbs: 57.2,
    fat: 1.7,
    fiber: 16.5,
  },
  "moong dal": {
    calories: 347,
    protein: 24.5,
    carbs: 59.9,
    fat: 1.2,
    fiber: 16.3,
  },
  "chana dal": {
    calories: 360,
    protein: 17.1,
    carbs: 60.9,
    fat: 5.3,
    fiber: 24.6,
  },
  rajma: { calories: 333, protein: 24.9, carbs: 60.3, fat: 0.8, fiber: 24.9 },

  // Grains
  rice: { calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, fiber: 0.4 },
  "wheat flour": {
    calories: 340,
    protein: 11.8,
    carbs: 71.2,
    fat: 1.5,
    fiber: 12.5,
  },

  // Spices
  "red chili powder": {
    calories: 282,
    protein: 12,
    carbs: 51.5,
    fat: 14,
    fiber: 32.6,
  },
  "turmeric powder": {
    calories: 312,
    protein: 9.7,
    carbs: 58.2,
    fat: 3.3,
    fiber: 21,
  },
  "cumin seeds": {
    calories: 375,
    protein: 17.8,
    carbs: 44.2,
    fat: 22.3,
    fiber: 10.5,
  },
  "garam masala": {
    calories: 252,
    protein: 9.2,
    carbs: 32.6,
    fat: 12.4,
    fiber: 22.3,
  },
  salt: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
  spices: { calories: 251, protein: 10.6, carbs: 41.8, fat: 13, fiber: 25 },

  // Non-vegetarian
  chicken: { calories: 120, protein: 25.3, carbs: 0, fat: 3.1, fiber: 0 },
  mutton: { calories: 118, protein: 21.5, carbs: 0, fat: 3.6, fiber: 0 },
  egg: { calories: 155, protein: 12.6, carbs: 1.1, fat: 10.6, fiber: 0 },
  fish: { calories: 100, protein: 20.1, carbs: 0, fat: 2.2, fiber: 0 },

  // Oils
  oil: { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  "mustard oil": { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  "coconut oil": { calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },

  // Generic items
  "main ingredient": {
    calories: 180,
    protein: 12,
    carbs: 20,
    fat: 8,
    fiber: 2,
  },
};

// Household measurements for standardizing quantities
export const householdMeasurements = {
  // Volume measurements
  teaspoon: { short: "tsp", ml: 5, g: { liquid: 5, powder: 4, oil: 4.5 } },
  tablespoon: {
    short: "tbsp",
    ml: 15,
    g: { liquid: 15, powder: 12, oil: 13.5 },
  },
  cup: {
    short: "cup",
    ml: 240,
    g: { liquid: 240, rice: 185, flour: 120, vegetable: 150 },
  },
  glass: { short: "glass", ml: 250, g: { liquid: 250 } },
  katori: {
    short: "katori",
    ml: 200,
    g: { "wet sabzi": 180, "dry sabzi": 150, dal: 200, rice: 150 },
  },

  // Weight
  gram: { short: "g", g: 1 },
  kilogram: { short: "kg", g: 1000 },

  // Count-based
  piece: {
    g: {
      small: 30,
      medium: 60,
      large: 100,
      tomato: { small: 60, medium: 90, large: 150 },
      potato: { small: 75, medium: 150, large: 250 },
      onion: { small: 50, medium: 100, large: 150 },
      "green chili": 5,
      "garlic clove": 5,
    },
  },
};

// Dish types for categorizing dishes
export const dishTypes = {
  "wet sabzi": [
    "paneer butter masala",
    "kadhai paneer",
    "palak paneer",
    "malai kofta",
    "rajma",
  ],
  "dry sabzi": [
    "aloo gobi",
    "bhindi masala",
    "jeera aloo",
    "aloo matar",
    "baingan bharta",
  ],
  dal: ["dal tadka", "dal makhani", "chana dal", "moong dal", "sambar"],
  "non-veg curry": [
    "chicken curry",
    "butter chicken",
    "mutton curry",
    "fish curry",
    "egg curry",
  ],
  rice: ["plain rice", "pulao", "biryani", "jeera rice", "fried rice"],
  bread: ["roti", "paratha", "naan", "bhature", "puri"],
  dessert: ["gulab jamun", "rasgulla", "jalebi", "barfi", "kheer"],
};
