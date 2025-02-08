import { Address } from "../types";

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
}: {
  selectedAddress: Address | null;
}) => {
  return (
    <div className="flex-1 overflow-y-auto divide-y divide-stone-200">
      <div className="h-12 bg-stone-100 flex items-center px-4"></div>
      <div className="max-w-xl border border-stone-200 rounded-md p-4 m-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg px-2 font-medium text-stone-900">
            Address Details
          </div>
          <button className="text-sm text-stone-500 hover:text-stone-900 hover:cursor-pointer px-2 py-1">
            Delete
          </button>
        </div>
        {selectedAddress ? (
          <>
            <AddressDetailsItem
              label="Address"
              value={selectedAddress?.address}
            />
            <AddressDetailsItem
              label="Country"
              value={selectedAddress?.country}
            />
            <AddressDetailsItem
              label="Postal Code"
              value={selectedAddress?.zip}
            />
          </>
        ) : (
          <div>No address selected</div>
        )}
      </div>
    </div>
  );
};
