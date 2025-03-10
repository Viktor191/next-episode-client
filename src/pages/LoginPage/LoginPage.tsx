import {useState, FormEvent} from "react";
import {chakra, Stack, Button, Center, Input, Text, Box} from "@chakra-ui/react";
import {useAuth} from "hooks/api/useAuth.ts";
import styles from "./LoginPage.module.css";
import {CustomLink} from "components/ui/CustomLink";

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {loginUser} = useAuth();

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser.mutate({username, password});
    };

    return (
        <Box className="auth-page"> {/*класс для фона */}
            <Center paddingTop={20}>
                <chakra.form className={styles.form} onSubmit={handleLogin}>
                    <Stack gap="4">
                        <Text fontSize="sm" textAlign="center">
                            Введите логин и пароль для входа
                        </Text>
                        {loginUser.isError && (
                            <Text color="red.500" fontSize="sm" textAlign="center">
                                Ошибка входа. Попробуйте снова.
                            </Text>
                        )}

                        <Input
                            name="login"
                            placeholder="Логин"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <CustomLink to="/register" color="blue.500">
                            Зарегистрируйтесь
                        </CustomLink>

                        <Button type="submit">Войти</Button>
                    </Stack>
                </chakra.form>
            </Center>
        </Box>
    );
};