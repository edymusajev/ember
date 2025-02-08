import { useQueryClient } from "@tanstack/react-query";
import { useDeleteAddress } from "../api";
import { Address } from "../types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

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

const DeleteAddressDialog = ({
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
  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1 text-sm font-medium hover:cursor-pointer flex-none">
        Delete
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-stone-500 opacity-50" />

      <DialogContent className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-white rounded-md p-4 space-y-4">
        <DialogTitle className="font-medium text-stone-900">
          Delete Address
        </DialogTitle>
        <DialogDescription className="text-stone-500 text-sm">
          Are you sure you want to delete this address?
        </DialogDescription>
        <div className="flex justify-end gap-4 text-sm">
          <DialogClose>Cancel</DialogClose>
          <DialogClose
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:cursor-pointer"
            onClick={() => handleDeleteAddress(selectedAddress?.id)}
          >
            Delete
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const AddressDetails = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
}) => {
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
      <div className="max-w-xl border border-stone-200 rounded-md m-4 mx-auto divide-y divide-stone-200">
        <AddressDetailsItem label="Address" value={selectedAddress?.address} />
        <AddressDetailsItem label="Country" value={selectedAddress?.country} />
        <AddressDetailsItem label="Postal Code" value={selectedAddress?.zip} />

        <div className="flex justify-end h-12 px-2 bg-stone-50">
          <DeleteAddressDialog
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </div>
      </div>
    </div>
  );
};
