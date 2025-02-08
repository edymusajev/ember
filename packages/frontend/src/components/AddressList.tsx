import { useGetAddresses } from "../api";

export const AddressList = () => {
  const { data } = useGetAddresses();
  console.log(data);
  return (
    <div>
      {data?.addresses.map((address) => (
        <div key={address.id}>{address.address}</div>
      ))}
    </div>
  );
};
