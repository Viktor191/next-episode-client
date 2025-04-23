import {useState} from "react";
import {
    Box,
    Button,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import {toaster} from "components/ui/toaster";
import {apiClient} from "helpers/apiClient";
import styles from "./ForgotPasswordPage.module.css";
import {Link, useNavigate} from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await apiClient.post("/auth/forgot-password", {email});

        toaster.create({
            title: "Письмо отправлено",
            type: "success",
            description: "Проверьте вашу почту для сброса пароля.",
        });
        navigate("/login");
    };

    return (
        <Box className="page-container">
            <Heading as="h2" className={styles.heading}>Восстановление пароля</Heading>

            <form onSubmit={handleSubmit}>
                <Stack gap={4} maxW="400px" mx="auto" mt={6}>
                    <Text className={styles.label}>Email</Text>
                    <Input
                        type="email"
                        placeholder="Введите ваш email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <Button type="submit" colorScheme="blue" className={styles.button}>
                        Отправить ссылку для восстановления
                    </Button>
                    <Box textAlign="center">
                        <Link to="/login" className={styles.registerLink}>
                            Назад к входу
                        </Link>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
};