import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAddress } from "../api";
import { Address } from "../types";

const Header = () => {
  return (
    <div className="h-12 flex items-center px-4">
      <span className="text-sm font-medium text-stone-900">
        Address Details
      </span>
    </div>
  );
};

const AddressDetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="grid grid-cols-2 py-2 px-2">
      <span className="text-sm font-medium text-stone-900">{label}</span>
      <span className="text-sm text-stone-700">{value}</span>
    </div>
  );
};

export const AddressDetails = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
}) => {
  const { mutate: deleteAddress } = useDeleteAddress();
  const queryClient = useQueryClient();

  const handleDeleteAddress = (id: number | undefined) => {
    if (!id) return;
    deleteAddress(id, {
      onSuccess: () => {
        setSelectedAddress(null);
        queryClient.invalidateQueries({
          queryKey: ["addresses"],
        });
      },
    });
  };
  if (!selectedAddress) {
    return (
      <div className="flex-1 overflow-y-auto divide-y divide-stone-200">
        <Header />
        <div className="p-4 text-sm text-stone-500">No address selected</div>
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-y-auto divide-y divide-stone-200">
      <Header />
      <div className="max-w-xl border border-stone-200 rounded-md p-4 m-4 mx-auto">
        <AddressDetailsItem label="Address" value={selectedAddress?.address} />
        <AddressDetailsItem label="Country" value={selectedAddress?.country} />
        <AddressDetailsItem label="Postal Code" value={selectedAddress?.zip} />

        <div className="flex justify-end">
          <button
            className="text-sm border rounded-md bg-red-400 hover:bg-red-500 text-white hover:cursor-pointer px-2 py-1"
            onClick={() => handleDeleteAddress(selectedAddress?.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
