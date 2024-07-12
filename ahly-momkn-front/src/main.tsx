import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./layouts/MainLayout/MainLayout";
import AppRouter from "@routes/AppRouter";
import { SearchProvider } from "./SearchContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  </ChakraProvider>
);
