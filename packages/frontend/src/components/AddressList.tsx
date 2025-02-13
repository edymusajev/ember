import { useGetAddresses } from "../api";
import { Address } from "../types";

export const AddressList = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
}) => {
  const { data } = useGetAddresses();

  return (
    <div className="divide-y divide-stone-200 overflow-y-auto w-1/3 min-w-64">
      <div className="p-2 flex items-center justify-between w-full h-12">
        <span className="flex-1 font-semibold tracking-wide truncate">
          Bye Bye Addresses 👋
        </span>
      </div>
      {data?.addresses.map((address) => (
        <div
          className={`hover:bg-stone-100 p-2 flex items-center justify-baseline w-full hover:cursor-pointer ${
            selectedAddress?.id === address.id ? "bg-stone-100" : ""
          }`}
          key={address.id}
          onClick={() => setSelectedAddress(address)}
        >
          <span className="flex-1 text-stone-900 text-sm truncate">
            {address.address}
          </span>
          <span className="text-stone-400 text-xs font-medium">
            {address.country}
          </span>
        </div>
      ))}
    </div>
  );
};
