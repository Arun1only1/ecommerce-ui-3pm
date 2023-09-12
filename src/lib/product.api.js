import { $axios } from "./axios";

export const getProductBySeller = async () => {
  const res = await $axios.post("/product/seller/all", { page: 1, limit: 10 });

  return res;
};
