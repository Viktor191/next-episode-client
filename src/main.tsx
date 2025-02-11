import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "components/App";
import { Provider } from "components/ui/provider";
import {Demo} from "components/App/testChakr.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider>
                <App />
                <Demo />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);