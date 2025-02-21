import {useState, FormEvent, useEffect} from "react";
import {Button, Fieldset, Input, Stack, Center} from "@chakra-ui/react";
import {Field} from "components/ui/field";
import {useNavigate} from "react-router-dom";
import styles from "./RegisterPage.module.css";
import {apiClient} from "helpers/apiClient";

export const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Текущее значение error:", error);
    }, [error]);

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        setError("");


        console.log("Отправка запроса...");
        const response = await apiClient.post("/auth/register", {username, password});
        console.log("Регистрация успешна:", response.data);
        navigate("/login");

    };

    return (
        <Center paddingTop={20}>
            <form className={styles.form} onSubmit={handleRegister}>
                <Fieldset.Root size="lg" maxW="md">
                    <Stack>
                        <Fieldset.Legend>Регистрация</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Пожалуйста, введите свои данные
                        </Fieldset.HelperText>
                        {error && <p style={{color: "red"}}>{error}</p>}
                    </Stack>

                    <Fieldset.Content>
                        <Field label="Логин">
                            <Input
                                name="username"
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

                        <Button onClick={() => navigate("/login")}>
                            Войти
                        </Button>
                    </Fieldset.Content>

                    <Button type="submit">
                        Зарегистрироваться
                    </Button>
                </Fieldset.Root>
            </form>
        </Center>
    );
};