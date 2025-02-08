import { useQuery } from "@tanstack/react-query";
import { Address } from "./types";

const API_URL = "http://localhost:4001/";

const fetchAddresses = async () => {
  const res = await fetch(API_URL);
  return res.json() as Promise<{ addresses: Address[] }>;
};

export const useGetAddresses = () => {
  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  return query;
};
