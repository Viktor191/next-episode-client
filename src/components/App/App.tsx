import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, ReactNode, Suspense, useEffect} from "react";
import {routes} from "../../routes.ts";
import {Toaster, toaster} from "components/ui/toaster";
import {useGlobalStore} from "stores/useGlobalStore";
import {PrivateLayout} from "components/PrivateLayout";

const LoginPage = lazy(() => import("../../pages/LoginPage").then(m => ({default: m.LoginPage})));
const RegisterPage = lazy(() => import("../../pages/RegisterPage").then(m => ({default: m.RegisterPage})));

export function App(): ReactNode {
    const {error} = useGlobalStore();

    useEffect(() => {
        if (error) {
            toaster.create({
                title: "Error",
                type: "error",
                description: error,
            });
        }
    }, [error]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
    };

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    <Route element={<PrivateLayout onLogout={handleLogout}/>}>
                        {routes
                            .filter((route) => route.path !== "/login" && route.path !== "/register")
                            .map((route) => {
                                const Component = lazy(() =>
                                    import(`../../pages/${route.component}`).then((module) => ({
                                        default: module[route.component],
                                    }))
                                );
                                return (
                                    <Route key={route.path} path={route.path} element={<Component/>}/>
                                );
                            })}
                    </Route>
                </Routes>
            </Suspense>
            <Toaster/>
        </>
    );
}