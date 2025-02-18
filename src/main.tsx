import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "components/App";
import { Provider } from "components/ui/provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: false }}>
            <Provider>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);