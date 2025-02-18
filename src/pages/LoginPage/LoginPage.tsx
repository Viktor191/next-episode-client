import {useState, FormEvent, useEffect} from "react";
import {Button, Fieldset, Input, Stack, Center} from "@chakra-ui/react";
import {Field} from "components/ui/field";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import styles from "./LoginPage.module.css";
import {apiClient} from "helpers/apiClient";
import {CustomLink} from "components/ui/CustomLink";

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Текущее значение error:", error);
    }, [error]);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            console.log("Отправка запроса на URL:", apiClient.defaults.baseURL + " /auth/login");
            const response = await apiClient.post("auth/login", {username, password});

            localStorage.setItem("authToken", response.data.token);
            console.log("Успешный вход:", response.data);

            navigate("/favorites");
        } catch (err) {
            const error = err as AxiosError<{ error: string }>;
            console.error("Ошибка авторизации:", error);
            setError(error.response?.data?.error || "Ошибка сервера");
        }
    };

    return (
        <Center paddingTop={20}>
            <form action="#" className={styles.form} onSubmit={handleLogin}>
                <Fieldset.Root size="lg" maxW="md">
                    <Stack>
                        <Fieldset.Legend>Вход</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Введите логин и пароль для входа
                        </Fieldset.HelperText>
                        {error ? <p style={{color: "red"}}>{error}</p> : null}
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

                        <CustomLink to="/register" color="blue.500">
                            Зарегистрируйтесь
                        </CustomLink>
                    </Fieldset.Content>

                    <Button type="submit">
                        Войти
                    </Button>
                </Fieldset.Root>
            </form>
        </Center>
    );
};