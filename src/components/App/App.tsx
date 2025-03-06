import {Routes, Route, Navigate} from "react-router-dom";
import {lazy, ReactNode, Suspense, useEffect} from "react";
import {routes} from "../../routes.ts";
import {Toaster, toaster} from "components/ui/toaster";
import {useGlobalStore} from "stores/useGlobalStore";
import {ProtectedRoute} from "components/ProtectedRoute";

export function App(): ReactNode {
    const {error, toasterData, clearToaster} = useGlobalStore();

    useEffect(() => {
        if (error) {
            toaster.create({
                title: "Ошибка",
                type: "error",
                description: error,
            });
        }
    }, [error]);

    useEffect(() => {
        if (toasterData) {
            toaster.create({
                title: toasterData.title,
                type: toasterData.type,
                description: toasterData.description,
            });
            clearToaster(); // Очищаем тост после показа
        }
    }, [toasterData, clearToaster]);

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