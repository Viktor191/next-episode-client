import {useState, FormEvent} from "react";
import {Eye, EyeOff} from "lucide-react";
import {chakra, Stack, Button, Center, Input, Text, Box} from "@chakra-ui/react";
import {useAuth} from "hooks/api/useAuth";
import styles from "./LoginPage.module.css";
import {Link} from "react-router-dom";
import {GoogleLoginButton} from "components/GoogleLoginButton";

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
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
                            className={styles.input}
                        />

                        <Box className={styles.passwordWrapper}>
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Пароль"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.passwordToggle}
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </Box>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Вход..." : "Войти"}
                        </Button>
                        <Box textAlign="center">
                            <GoogleLoginButton/>
                        </Box>
                        <Box textAlign="center">
                            <Link to="/register" className={styles.registerLink}>
                                Зарегистрируйтесь
                            </Link>
                        </Box>
                    </Stack>
                </chakra.form>
            </Center>
        </Box>
    );
};