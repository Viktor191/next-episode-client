import {Routes, Route, Navigate} from 'react-router-dom';
import {lazy, ReactNode, Suspense, useEffect} from "react";
import {routes} from "../../routes.ts";
import {Toaster, toaster} from "components/ui/toaster"
import {useGlobalStore} from "stores/useGlobalStore";

export function App(): ReactNode {
    const {error} = useGlobalStore();


    useEffect(() => {// разобрать как работает
        if (error) {
            toaster.create({
                title: "Error",
                type: "error",
                description: error,
            })
        }
    }, [error]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {routes.map((route) => {
                        const Component = lazy(() =>
                            import(`../../pages/${route.component}`).then((module) => ({
                                default: module[route.component],
                            }))
                        );

                        return (
                            <Route key={route.path} path={route.path} element={<Component/>}/>
                        );
                    })}
                    <Route path="/" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </Suspense>
            <Toaster/>
        </>
    );
}