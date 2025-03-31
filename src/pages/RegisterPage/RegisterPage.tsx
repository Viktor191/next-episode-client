import {useState, FormEvent} from "react";
import {
    Box,
    Button,
    chakra,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import styles from "./RegisterPage.module.css";
import {useRegister} from "hooks/api/useRegister";
import {Eye, EyeOff} from "lucide-react";
import {Link} from "react-router-dom";

export const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const {registerUser} = useRegister();

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        setError("");
        setLoading(true);
        registerUser.mutate({username, password}, {
            onSettled: () => setLoading(false),
        });
    };

    return (
        <Box className="auth-page">
            <chakra.form className={styles.form} onSubmit={handleRegister}>
                <Stack gap="4">
                    <Text fontSize="sm" textAlign="center" color="#ee8b05">
                        Пожалуйста, введите свои данные для регистрации
                    </Text>

                    {error && (
                        <Text className={styles.error}>
                            {error}
                        </Text>
                    )}

                    <Input
                        name="username"
                        placeholder="Логин"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Box className={styles.passwordWrapper}>
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.passwordInput}
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </Box>

                    <Box className={styles.passwordWrapper}>
                        <Input
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Подтвердите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={styles.passwordInput}
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </Box>

                    <Button type="submit" disabled={loading}>
                        {loading ? "Регистрация..." : "Зарегистрироваться"}
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