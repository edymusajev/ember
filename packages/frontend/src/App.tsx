import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddressList } from "./components/AddressList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddressList />
    </QueryClientProvider>
  );
}

export default App;
