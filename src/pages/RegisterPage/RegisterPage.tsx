import { useState, FormEvent } from "react";

import { Button, Fieldset, Input, Link, Stack } from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { Center } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import { apiClient } from "helpers/apiClient";

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Очистка ошибки перед проверкой

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    await apiClient.post("/register", { username, password });

    console.log("Регистрация:", { username, password });
  };

  return (
    <Center paddingTop={20}>
      <form action="#" className={styles.form} onSubmit={handleRegister}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Регистрация</Fieldset.Legend>
            <Fieldset.HelperText>
              Пожалуйста, введите свои данные
            </Fieldset.HelperText>
            {error && <Fieldset.HelperText>{error}</Fieldset.HelperText>}
          </Stack>

          <Fieldset.Content>
            <Field label="Логин">
              <Input
                name="login"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>

            <Field label="Пароль">
              <Input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            <Field label="Подтвердите пароль">
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field>
            {/* @ts-ignore */}
            <Link as={RouterLink} to="/login">
              Залогиниться
            </Link>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start">
            Submit
          </Button>
        </Fieldset.Root>
      </form>
    </Center>
  );
};
