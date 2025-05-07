import { Loader } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  }, [navigate, token]);

  if (!token) {
    return <Loader />;
  }

  return <>{children}</>;
};
