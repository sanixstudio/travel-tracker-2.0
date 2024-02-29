import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { ThemeProvider } from "./theme/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

import { PUBLISHABLE_KEY } from "./utils/constants.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
