import {useState, FormEvent} from "react";
import {chakra, Stack, Button, Center, Input, Text, Box} from "@chakra-ui/react";
import {useAuth} from "hooks/api/useAuth";
import styles from "./LoginPage.module.css";
import {Link} from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {loginUser} = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        loginUser.mutate({username, password}, {
            onSettled: () => {
                setLoading(false);
            }
        });
    };

    return (
        <Box className="auth-page">
            <Center paddingTop={20}>
                <chakra.form className={styles.form} onSubmit={handleLogin}>
                    <Stack gap="4">

                        <Text fontSize="sm" textAlign="center">
                            Введите логин и пароль для входа
                        </Text>
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

                        <Link to="/register" color="blue.500">
                            Зарегистрируйтесь
                        </Link>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Вход..." : "Войти"}
                        </Button>
                    </Stack>

                </chakra.form>
            </Center>
        </Box>
    );
};