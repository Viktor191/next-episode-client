import {useState} from "react";
import {Box, Flex} from "@chakra-ui/react";
import {LogOut, Menu, X} from "lucide-react";
import {useNavigate, NavLink} from "react-router-dom";
import styles from "./NavigationBar.module.css";

export const NavigationBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = (): void => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const MobileNavLink = ({
                               to,
                               children,
                           }: {
        to: string;
        children: React.ReactNode;
    }) => (
        <NavLink
            to={to}
            onClick={() => setIsMenuOpen(false)}
            className={({isActive}) => (isActive ? styles.activeLink : styles.link)}
        >
            {children}
        </NavLink>
    );

    return (
        <Box className={styles.navigationBar}>
            <Flex justifyContent="space-between" alignItems="center" className={styles.header}>
                <Box className={styles.menuIcon} onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </Box>
            </Flex>

            <Flex
                className={`${styles.navLinks} ${
                    isMenuOpen ? styles.mobileOverlayVisible : styles.mobileOverlayHidden
                } ${styles.mobileOverlay}`}
            >
                <MobileNavLink to="/favorites">Избранное</MobileNavLink>
                <MobileNavLink to="/imdbSearch">Поиск по IMDb ID</MobileNavLink>
                <MobileNavLink to="/search">Поиск по названию</MobileNavLink>
                <MobileNavLink to="/upcoming">Скоро на экранах</MobileNavLink>
                <Flex className={styles.logoutLink} onClick={handleLogout}>
                    <LogOut size={20}/>
                    <span>Выйти</span>
                </Flex>
            </Flex>
        </Box>
    );
};