import { Card } from "Components/Card/Card";
import React from "react";

type ProductListProps = {
  data: IProduct[];
  filter: string;
  increaseCartQuantity: (id: number, item: IProduct) => void;
  decreaseCartQuantity: (id: number) => void;
  getItemQuantity: (id: number) => number | undefined;
  remove: (id: number) => void;
};
export const ProductList: React.FC<ProductListProps> = ({
  data,
  decreaseCartQuantity,
  filter,
  getItemQuantity,
  increaseCartQuantity,
  remove,
}) => {
  return (
    <>
      {data.map((product: IProduct) => {
        if (filter && product.colour !== filter) return null;
        const quantity = getItemQuantity(product.id);
        return (
          <Card
            data-testid="product-list"
            key={product.id}
            image={product.img}
            name={product.name}
            price={product.price}
            quantity={quantity}
            id={product.id}
            onChange={(id, type) => {
              type === "increment" && increaseCartQuantity(id, product);
              type === "decrement" && decreaseCartQuantity(id);
            }}
            onRemove={remove}
          />
        );
      })}
    </>
  );
};
