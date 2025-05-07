import { useState, FormEvent } from 'react';
import { Box, Button, chakra, Input, Stack, Text } from '@chakra-ui/react';
import styles from './RegisterPage.module.css';
import { useRegister } from 'hooks/api/useRegister';
import { Link } from 'react-router-dom';
import { PasswordInput } from 'components/PasswordInput';

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { registerUser } = useRegister();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    setError('');
    setLoading(true);
    registerUser.mutate(
      { username, password },
      {
        onSettled: () => setLoading(false),
      }
    );
  };

  return (
    <Box className="auth-page">
      <chakra.form className={styles.form} onSubmit={handleRegister}>
        <Stack gap="4">
          <Text fontSize="sm" textAlign="center" color="#ee8b05">
            Пожалуйста, введите свои данные для регистрации
          </Text>

          {error && <Text className={styles.error}>{error}</Text>}

          <Input
            name="username"
            placeholder="Логин"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />

          <PasswordInput
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <PasswordInput
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>

          <Box textAlign="center">
            <Link to="/login" className={styles.registerLink}>
              У вас уже есть аккаунт?
            </Link>
          </Box>
        </Stack>
      </chakra.form>
    </Box>
  );
};
