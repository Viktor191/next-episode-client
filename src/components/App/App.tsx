import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, ReactNode, Suspense} from "react";
import {routes} from "../../routes";
import {Toaster} from "components/ui/toaster";
import {ProtectedRoute} from "components/ProtectedRoute";
import {NavigationBar} from "components/NavigationBar";
import {Loader} from "components/Loader";

export function App(): ReactNode {

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                    {routes.map(({path, component, isProtected}) => {
                        const Component = lazy(() =>
                            import(`../../pages/${component}`).then((module) => ({
                                default: module[component],
                            }))
                        );
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    isProtected ? (
                                        <ProtectedRoute>
                                            <NavigationBar/>
                                            <Component/>
                                        </ProtectedRoute>
                                    ) : (
                                        <Component/>
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
            <Toaster/>
        </>
    );
}