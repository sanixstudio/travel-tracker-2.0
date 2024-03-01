import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { ThemeProvider } from "./theme/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

import { PUBLISHABLE_KEY } from "./utils/constants.ts";
import PinLocationProvider from "./context/pinLocationContext.tsx";
import { FlyToLocationProvider } from "./context/flyToLocation.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <PinLocationProvider>
        <FlyToLocationProvider>
          <ThemeProvider>
            <Toaster />
            <App />
          </ThemeProvider>
        </FlyToLocationProvider>
      </PinLocationProvider>
    </ClerkProvider>
  </React.StrictMode>
);
