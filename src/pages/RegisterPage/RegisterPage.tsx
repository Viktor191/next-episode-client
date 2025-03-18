import {useState, FormEvent} from "react";
import {chakra, Stack, Button, Center, Input, Text, Box} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterPage.module.css";
import {useRegister} from "hooks/api/useRegister";
import {Eye, EyeOff} from "lucide-react";

export const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const {registerUser} = useRegister();

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        setError("");
        registerUser.mutate({username, password});
    };

    return (
        <Box className="auth-page">
            <Center paddingTop={20}>
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
                        />

                        <div className={styles.passwordWrapper}>
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Пароль"
                                required
                                value={password}
                                className={styles.passwordInput}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>

                        <div className={styles.passwordWrapper}>
                            <Input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Подтвердите пароль"
                                required
                                value={confirmPassword}
                                className={styles.passwordInput}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>

                        <Button type="submit">Зарегистрироваться</Button>
                        <Button onClick={() => navigate("/login")}>Войти</Button>
                    </Stack>
                </chakra.form>
            </Center>
        </Box>
    );
};