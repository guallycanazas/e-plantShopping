import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItems } from "../redux/CartSlice";
import { plants } from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [disabledIds, setDisabledIds] = useState(() => new Set());

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setDisabledIds((prev) => new Set(prev).add(plant.id));
  };

  const grouped = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <main className="product-list">
      <h1>Our Houseplants</h1>
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2>{category}</h2>
          <div className="product-grid">
            {items.map((plant) => {
              const inCart = cartItems.some((it) => it.id === plant.id);
              const isDisabled = disabledIds.has(plant.id) || inCart;
              return (
                <article key={plant.id} className="product-card">
                  <img src={plant.thumbnail} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.price.toFixed(2)}</p>
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleAdd(plant)}
                  >
                    {isDisabled ? "Added" : "Add to Cart"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ProductList;
