import { ReactNode, createContext } from "react";

import { useLocalStorage } from "hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  item: IProduct;
};

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number | undefined;
  increaseCartQuantity: (id: number, item: IProduct) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  totalPrice: number;
};

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (quantity, item) => item.quantity * item.item.price + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity;
  }
  function increaseCartQuantity(id: number, item: IProduct) {
    setCartItems((currItems) => {
      const itemToUpdate = currItems.find((it) => it.id === id);
      if (itemToUpdate == null) {
        return [...currItems, { id, quantity: 1, item: item }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        totalPrice,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
