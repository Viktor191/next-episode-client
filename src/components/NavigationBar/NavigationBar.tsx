import {Box, Flex} from "@chakra-ui/react";
import {LogOut} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./NavigationBar.module.css";


export const NavigationBar = () => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <Box className={styles.navigationBar}>
            <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
                <Flex className={styles.navLinks}>
                    <NavLink to="/favorites" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Избранное
                    </NavLink>
                    <NavLink to="/imdbSearch" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Поиск по IMDb ID
                    </NavLink>
                    <NavLink to="/search" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Поиск по названию
                    </NavLink>
                    <NavLink to="/upcoming" className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                        Скоро на экранах
                    </NavLink>
                </Flex>
                <Flex className={styles.logoutLink} onClick={handleLogout}>
                    <LogOut size={20}/>
                    <span>Выйти</span>
                </Flex>
            </Flex>
        </Box>
    );
};