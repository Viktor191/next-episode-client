import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { toaster } from 'components/ui/toaster';
import { apiClient } from 'helpers/apiClient';
import axios from 'axios';
import styles from './ResetPasswordPage.module.css';

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toaster.create({
        title: 'Неверная ссылка',
        type: 'error',
        description: 'Отсутствует токен для сброса пароля.',
      });
      return;
    }

    if (password !== confirmPassword) {
      toaster.create({
        title: 'Пароли не совпадают',
        type: 'error',
        description: 'Пожалуйста, введите одинаковые пароли',
      });
      return;
    }

    try {
      await apiClient.post('/auth/reset-password', { token, password });

      toaster.create({
        title: 'Пароль обновлён',
        type: 'success',
        description: 'Вы можете войти с новым паролем',
      });

      navigate('/login');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toaster.create({
          title: 'Ошибка сброса',
          type: 'error',
          description: error.response.data.error as string,
        });
        return;
      }
      if (error instanceof Error) {
        toaster.create({
          title: 'Ошибка сброса',
          type: 'error',
          description: error.message,
        });
        return;
      }
      toaster.create({
        title: 'Ошибка сброса',
        type: 'error',
        description: 'Не удалось сбросить пароль',
      });
    }
  };

  return (
    <Box className="page-container">
      <Heading as="h2" className={styles.heading}>
        Сброс пароля
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack gap={4} maxW="400px" mx="auto" mt={6}>
          <Text className={styles.label}>Новый пароль</Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <Text className={styles.label}>Повторите пароль</Text>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />

          <Button type="submit" colorScheme="blue" className={styles.button}>
            Сбросить пароль
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
