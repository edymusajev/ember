import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddressList } from "./components/AddressList";
import { AddressDetails } from "./components/AddressDetails";
import { Address } from "./types";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <div className="flex divide-x divide-stone-200 h-full w-full">
          <AddressList
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <AddressDetails selectedAddress={selectedAddress} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
