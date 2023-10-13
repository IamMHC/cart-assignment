import { ShoppingCartProvider } from "./ShoppingCartContext";
import { useShoppingCart } from "../hooks/contexthooks/useShoppingCart";
import { FC, ReactNode } from "react";
import { act, RenderResult, render, renderHook } from "@testing-library/react";

describe("ShoppingCartContext", () => {
  describe("useShoppingCart", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });
    it("returns the expected methods and state", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      expect(result.current.cartItems).toEqual([]);
      expect(result.current.cartQuantity).toEqual(0);
      expect(result.current.totalPrice).toEqual(0);
      expect(result.current.removeFromCart).toBeDefined();
      expect(result.current.getItemQuantity).toBeDefined();
      expect(result.current.increaseCartQuantity).toBeDefined();
      expect(result.current.decreaseCartQuantity).toBeDefined();
    });

    it("increases the cart quantity when an item is added", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });

      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "red",
          img: "test.png",
        });
      });

      expect(result.current.cartQuantity).toEqual(1);

      expect(result.current.getItemQuantity(1)).toEqual(1);
    });

    it("decreases the cart quantity when an item is removed", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "red",
          img: "test.png",
        });
        result.current.removeFromCart(1);
      });
      expect(result.current.cartQuantity).toEqual(0);
    });

    it("updates the cart items in local storage", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
      });
      expect(JSON.parse(localStorage.getItem("shopping-cart")!)).toEqual([
        {
          id: 1,
          quantity: 1,
          item: {
            id: 1,
            name: "Test Product",
            price: 9.99,
            img: "",
            colour: "",
          },
        },
      ]);
    });

    it("updates the cart quantity and total price when an item is added", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "red",
          img: "test.png",
        });
      });
      expect(result.current.cartQuantity).toEqual(1);
      expect(result.current.totalPrice).toEqual(9.99);
    });

    it("updates the cart quantity and total price when an item is removed", () => {
      type WrapperProps = {
        children: React.ReactNode;
      };

      const Wrapper: React.FC<WrapperProps> = ({ children }) => (
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      );

      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: Wrapper,
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.removeFromCart(1);
      });
      expect(result.current.cartQuantity).toEqual(0);
      expect(result.current.totalPrice).toEqual(0);
    });

    it("updates the cart quantity and total price when an item quantity is increased", () => {
      const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      );

      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
      });
      expect(result.current.cartQuantity).toEqual(2);
      expect(result.current.totalPrice).toEqual(19.98);
    });

    it("updates the cart quantity and total price when an item quantity is decreased", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.decreaseCartQuantity(1);
      });
      expect(result.current.cartQuantity).toEqual(1);
      expect(result.current.totalPrice).toEqual(9.99);
    });
    it("not update the cart quantity and total price when an item quantity is decreased with wrong id", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.decreaseCartQuantity(2);
      });
      expect(result.current.cartQuantity).toEqual(2);
      expect(result.current.totalPrice).toEqual(19.98);
    });
    it("not update the cart quantity and total price when an item quantity is decreased with wrong id", () => {
      const { result } = renderHook(() => useShoppingCart(), {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        ),
      });
      act(() => {
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.increaseCartQuantity(1, {
          id: 1,
          name: "Test Product",
          price: 9.99,
          colour: "",
          img: "",
        });
        result.current.decreaseCartQuantity(2);
      });
      expect(result.current.cartQuantity).toEqual(2);
      expect(result.current.totalPrice).toEqual(19.98);
    });
  });

  describe("ShoppingCartProvider", () => {
    it("renders the children", () => {
      const { getByText }: RenderResult = render(
        <ShoppingCartProvider>
          <div>Test Child</div>
        </ShoppingCartProvider>
      );
      expect(getByText("Test Child")).toBeInTheDocument();
    });
  });
});
