import { useShoppingCart } from "hooks/contexthooks/useShoppingCart";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { Container, ProductList, CartTotal, Select } from "./Components";
import { getProducts } from "./api/products";
import { BASE_URL } from "./config";
import { uniqueByValue } from "utils/array";

function App() {
  const { isLoading, data, error } = useSWR(BASE_URL, getProducts, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    removeFromCart,
    totalPrice,
  } = useShoppingCart();
  const [filter, setFilter] = useState<string>("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const onFilter = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(value);
    },
    []
  );
  const remove = (id: number) => {
    const indexOfProduct = data.findIndex((item: IProduct) => item.id === id);
    data.splice(indexOfProduct, 1);
    removeFromCart(id);
  };
  useEffect(() => {
    if (data) {
      const filterOptions = data.map((item: IProduct) => ({
        value: item.colour,
        label: item.colour,
      }));
      setOptions([
        { value: "", label: "All" },
        ...uniqueByValue(filterOptions),
      ]);
    }
  }, [data]);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <Container>
      <Select onFilter={onFilter} options={options} />
      <ProductList
        data={data}
        filter={filter}
        increaseCartQuantity={increaseCartQuantity}
        decreaseCartQuantity={decreaseCartQuantity}
        getItemQuantity={getItemQuantity}
        remove={remove}
      />
      <CartTotal totalPrice={totalPrice} />
    </Container>
  );
}

export default App;
