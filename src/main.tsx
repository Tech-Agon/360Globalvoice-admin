import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Store } from "./state/store.tsx";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

let persitstore = persistStore(Store);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persitstore}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>{" "}
      </PersistGate>
    </Provider>
  </StrictMode>
);
