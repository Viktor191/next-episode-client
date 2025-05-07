import { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { LogOut, Menu, X } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      onClick={() => setIsMenuOpen(false)}
      className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
    >
      {children}
    </NavLink>
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <Box className={styles.navigationBar}>
      <Flex justifyContent="space-between" alignItems="center" className={styles.header}>
        <Box className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Box>
      </Flex>

      <Flex
        ref={menuRef}
        className={`${styles.navLinks} ${
          isMenuOpen ? styles.mobileOverlayVisible : styles.mobileOverlayHidden
        } ${styles.mobileOverlay}`}
      >
        <div className={styles.menuItem}>
          <MobileNavLink to="/upcoming">Скоро на экранах</MobileNavLink>
        </div>
        <div className={styles.menuItem}>
          <MobileNavLink to="/favorites">Избранное</MobileNavLink>
        </div>
        <div className={styles.menuItem}>
          <MobileNavLink to="/imdbSearch">Поиск по IMDb ID</MobileNavLink>
        </div>
        <div className={styles.menuItem}>
          <MobileNavLink to="/search">Поиск по названию</MobileNavLink>
        </div>
        <div className={styles.menuItem}>
          <MobileNavLink to="/profile">Профиль</MobileNavLink>
        </div>
        <div className={styles.menuItem}>
          <Flex className={styles.logoutLink} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Выйти</span>
          </Flex>
        </div>
      </Flex>
    </Box>
  );
};
