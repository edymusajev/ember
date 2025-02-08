import { useQuery } from "@tanstack/react-query";

const fetchAddresses = async () => {
  const res = await fetch("http://localhost:4001/");
  return res.json();
};

export const useGetAddresses = () => {
  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });

  return query;
};
