import {ReactNode} from "react";
import {Box, Flex} from "@chakra-ui/react";
import {LogOut} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "./NavigationBar.module.css";

interface NavigationBarProps {
    onLogout: () => void;
}

export const NavigationBar = ({onLogout}: NavigationBarProps): ReactNode => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        onLogout();
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
                        Предстоящие фильмы
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