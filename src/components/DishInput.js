import React, { useState } from "react";

const DishInput = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsSubmitting(true);
      onSubmit(inputValue.trim());
      // Don't reset input value to preserve the user's last search
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dish-input-container">
      <h2>Enter an Indian Dish Name</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., Paneer Butter Masala, Dal Tadka, Aloo Gobi"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={!inputValue.trim() || isSubmitting}>
            Calculate Nutrition
          </button>
        </div>
      </form>
    </div>
  );
};

export default DishInput;
