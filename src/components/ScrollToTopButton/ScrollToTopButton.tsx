import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Вернуться наверх"
      style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ee8b05',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.3s',
      }}
    >
      <ArrowUp size={24} />
    </button>
  );
};
