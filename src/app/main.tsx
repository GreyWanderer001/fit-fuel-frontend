import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "@/shared/components/ui/sonner";

import { AuthProvider, RouterProvider, StoreProvider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <AuthProvider>
        <RouterProvider />
        <Toaster richColors />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>,
);
