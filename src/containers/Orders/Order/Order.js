import React from "react";
import classes from "./Order.module.css";
const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      value: props.ingredients[ingredientName]
    });
  }
  const output = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          border: "1px solid #ccc",
          margin: "0 8px",
          padding: "5px",
          textTransform: "capitalize"
        }}
      >
        {ingredient.name} ({ingredient.value})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {output}</p>
      <p>
        Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
