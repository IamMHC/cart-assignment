import React from "react";
import "./Card.css";

interface CardProps {
  image: string;
  name: string;
  id: number;
  price: number;
  quantity?: number;
  onChange: (id: number, type?: "increment" | "decrement") => void;
  onRemove: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({
  id,
  image,
  name,
  price,
  quantity = 0,
  onChange,
  onRemove,
}) => {
  return (
    <>
      <div className="multi-text">
        <div className="item-price">
          <div className="item-image">
            <img src={image} alt={name} />
          </div>
          <div className="item-text">
            <h2>{name}</h2>
            <div className="price-detail">
              <p>&#163;</p>
              <h2>{price}</h2>
            </div>
          </div>
        </div>
        <div>
          <div className="add-price">
            <button
              className="button"
              data-testid="decrement-button"
              onClick={() => !!quantity && onChange(id, "decrement")}
              disabled={quantity === 0}
            >
              -
            </button>
            <p className="price-text">{quantity}</p>
            <button
              className="button"
              data-testid="increment-button"
              onClick={() => onChange(id, "increment")}
            >
              +
            </button>
          </div>
          <button
            className="button"
            data-testid="remove-button"
            onClick={() => onRemove(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};
