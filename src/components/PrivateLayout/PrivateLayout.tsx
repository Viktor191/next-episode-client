import {ReactNode, useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Box} from "@chakra-ui/react";
import {NavigationBar} from "components/NavigationBar";

interface PrivateLayoutProps {
    onLogout: () => void;
}

export const PrivateLayout = ({onLogout}: PrivateLayoutProps): ReactNode => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Box>
            <NavigationBar onLogout={onLogout}/>
            <Box p={4}>
                <Outlet/> {/* Контент вложенных страниц */}
            </Box>
        </Box>
    );
};