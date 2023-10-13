import axios from "axios";

export const getProducts = (url: string) =>
  axios.get(url).then((res) => res.data);
