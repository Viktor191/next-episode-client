import {useState, FormEvent} from "react";
import {Button, Fieldset, Input, Stack, Center} from "@chakra-ui/react";
import {Field} from "components/ui/field";
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
        <Center paddingTop={20}>
            <form className={styles.form} onSubmit={handleLogin}>
                <Fieldset.Root size="lg" maxW="md">
                    <Stack>
                        <Fieldset.Legend>Вход</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Введите логин и пароль для входа
                        </Fieldset.HelperText>
                        {loginUser.isError && (
                            <p style={{color: "red"}}>Ошибка входа. Попробуйте снова.</p>
                        )}
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