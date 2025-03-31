import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export const BodyScrollController = (): null => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    useEffect(() => {
        if (isAuthPage) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isAuthPage]);

    return null;
};