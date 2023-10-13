import { render, screen, fireEvent } from "@testing-library/react";
import useSWR from "swr";
import App from "./App";
import { ShoppingCartProvider } from "context/ShoppingCartContext";

jest.mock("swr");

describe("App", () => {
  describe("when the api call fails", () => {
    beforeEach(() => {
      (useSWR as jest.Mock).mockImplementation((_, fetcher) => ({
        data: null,
        error: "error",
        isLoading: false,
        isValidating: false,
        mutate: jest.fn(),
      }));
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
    it("when error comes", async () => {
      render(
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      );

      const product2 = screen.queryByText("failed to load");
      expect(product2).toBeInTheDocument();
    });
  });
  describe("when the api call is loading", () => {
    beforeEach(() => {
      (useSWR as jest.Mock).mockImplementation((_, fetcher) => ({
        data: null,
        error: undefined,
        isLoading: true,
        isValidating: false,
        mutate: jest.fn(),
      }));
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
    it("In Loading State", async () => {
      render(
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      );
      const product2 = screen.queryByText("loading...");
      expect(product2).toBeInTheDocument();
    });
  });
  describe("when the api call succeeds", () => {
    const mockData = [
      {
        id: 1,
        name: "Product 1",
        color: "Red",
        price: 10,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Product 2",
        color: "Blue",
        price: 20,
        image: "https://via.placeholder.com/150",
      },
    ];

    beforeEach(() => {
      (useSWR as jest.Mock).mockImplementation((_, fetcher) => ({
        data: mockData,
        error: undefined,
        isValidating: false,
        mutate: jest.fn(),
      }));
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("filters the product list", async () => {
      render(
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      );
      const select = await screen.findByTestId("select");
      fireEvent.change(select, { target: { value: "Red" } });

      const product1 = screen.queryByText("Product 1");
      expect(product1).toBeInTheDocument();
    });

    it("removes a product from the list and cart", async () => {
      render(
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      );
      const removeButton = await screen.findAllByTestId("remove-button");
      const incrementButton = screen.getAllByTestId("increment-button");
      fireEvent.click(incrementButton[0]);
      fireEvent.click(removeButton[0]);
      const product1 = screen.queryByText("Product 1");
      expect(product1).not.toBeInTheDocument();
      const product2 = await screen.findByText("Product 2");
      expect(product2).toBeInTheDocument();
    });
  });
});
