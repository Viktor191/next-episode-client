import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'helpers/apiClient';

export const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (credential: string) => {
      const response = await apiClient.post('/auth/google', { credential });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      navigate('/upcoming');
    },
    onError: (err) => {
      console.error('❌ Ошибка входа через Google', err);
    },
  });

  return (
    <GoogleLogin
      text="continue_with" // Явно задаем текст кнопки
      shape="rectangular" // Форма кнопки
      size="medium" // Размер кнопки
      theme="filled_black" // Тема кнопки
      locale="ru" // Локаль (русский язык)
      onSuccess={(credentialResponse) => {
        const credential = credentialResponse.credential;
        if (credential) mutation.mutate(credential);
      }}
      onError={() => console.error('❌ Ошибка при попытке входа через Google')}
    />
  );
};
