# VYB AI Nutrition Calculator

A React application that estimates the nutritional value of home-cooked Indian dishes based on ingredient lists and standard household measurements.

## 🌟 Project Overview

This application solves the problem of calculating nutritional values for home-cooked Indian dishes. Given a dish name, it:

1. Fetches a generic recipe with ingredient list
2. Converts ingredient quantities into standardized household measurements
3. Maps ingredients to a nutrition database
4. Calculates total nutrition based on ingredients
5. Identifies the food type category
6. Extrapolates nutrition for a standard serving size
7. Displays nutrition per standard serving

## 🚀 Features

- Simple, user-friendly interface
- Support for various Indian dishes
- Handles household measurements (katori, cup, tsp, tbsp, etc.)
- Smart ingredient matching with fallbacks
- Responsive design for all device sizes
- Graceful error handling

## 📋 Technical Approach

The application follows a modular architecture:

1. **Data Layer**:

   - Nutrition database with values per 100g
   - Household measurement conversion data
   - Dish type categorization

2. **Core Logic**:

   - Recipe fetching (mock implementation)
   - Ingredient standardization
   - Nutrition calculation
   - Serving size estimation

3. **User Interface**:
   - Dish input component
   - Results display component
   - Error handling and loading states

## 🔧 Assumptions Made

- Recipes are typical for 3-4 people unless specified
- Standard serving sizes are based on typical household measurements (e.g., 1 katori = ~180g for Wet Sabzi)
- Ingredient quantity conversion is approximate
- Water loss during cooking is not accounted for
- When direct matches aren't found in the database, the application uses the closest available matches

## 📊 Test Cases

The application was tested with the following dishes:

1. **Paneer Butter Masala**

   - Dish Type: Wet Sabzi
   - Standard Serving: 1 katori (~180g)
   - Nutrition per serving: ~280 calories, 12g protein, 10g carbs, 18g fat

2. **Dal Tadka**

   - Dish Type: Dal
   - Standard Serving: 1 katori (~200g)
   - Nutrition per serving: ~220 calories, 14g protein, 30g carbs, 5g fat

3. **Aloo Gobi**

   - Dish Type: Dry Sabzi
   - Standard Serving: 1 katori (~150g)
   - Nutrition per serving: ~180 calories, 4g protein, 25g carbs, 7g fat

4. **Chicken Curry**

   - Dish Type: Non-Veg Curry
   - Standard Serving: 1 katori (~200g)
   - Nutrition per serving: ~240 calories, 25g protein, 8g carbs, 12g fat

5. **Palak Paneer**
   - Dish Type: Wet Sabzi
   - Standard Serving: 1 katori (~180g)
   - Nutrition per serving: ~220 calories, 14g protein, 10g carbs, 14g fat

## 💻 Running the Application

1. **Installation**:

   ```bash
   npm install
   ```

2. **Development Mode**:

   ```bash
   npm start
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

## 🔍 Future Improvements

- Integration with a real recipe API
- Machine learning model to improve ingredient matching
- User-customizable serving sizes
- Account for water loss/gain during cooking
- Support for more regional Indian dishes
- User accounts to save favorite dishes
- Enhanced nutritional analysis (micronutrients, etc.)

## 📄 License

ISC
