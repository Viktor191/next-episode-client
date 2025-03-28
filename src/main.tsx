import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {App} from "components/App";
import {Provider} from "components/ui/provider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./styles/global.css";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: Infinity,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter future={{
                    v7_startTransition: false,
                    v7_relativeSplatPath: true,
                }}>
                    <Provider>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>
);