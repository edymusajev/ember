import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Address } from "./types";

const API_URL = "http://localhost:4001";

const fetchAddresses = async () => {
  const res = await fetch(API_URL);
  return res.json() as Promise<{ addresses: Address[] }>;
};

const deleteAddress = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const useGetAddresses = () => {
  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  return query;
};

export const useDeleteAddress = () => {
  const query = useMutation({
    mutationFn: deleteAddress,
  });
  return query;
};
