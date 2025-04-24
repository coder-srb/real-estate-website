import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const AUDIENCE = import.meta.env.VITE_API_AUDIENCE;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-x33xfp5kbebsf7sq.us.auth0.com"
     clientId="p6NEUPCvslN806GWfUu6UPjpEsRBBQSO"
     authorizationParams={{
      redirect_uri: window.location.origin
     }}
     audience={AUDIENCE}
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
