import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, ReactNode, Suspense} from "react";
import {routes} from "../../routes";
import {Toaster} from "components/ui/toaster";
import {ProtectedRoute} from "components/ProtectedRoute";

export function App(): ReactNode {

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
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