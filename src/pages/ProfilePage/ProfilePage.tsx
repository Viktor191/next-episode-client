import {useEffect, useState, useRef} from "react";
import {
    Box,
    Button,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import {useUser} from "hooks/api/useUser";
import {toaster} from "components/ui/toaster";
import styles from "./ProfilePage.module.css";
import {Toggle} from "components/ToggleFilter";

export const ProfilePage = () => {
    const {getMe, updateUserProfile} = useUser();
    const emailRef = useRef<HTMLInputElement>(null);

    const {data: user} = getMe(); // получаем текущего пользователя
    const {mutateAsync: updateUser} = updateUserProfile;

    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [notify, setNotify] = useState(true);

    const isProfileFilled = !!user?.email || !!user?.telegram;

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            setTelegram(user.telegram || "");
            setNotify(user.notify ?? true);
        }
    }, [user]);

    const handleSave = async () => {
        await updateUser({email, telegram, notify}); // ошибка будет показана автоматически
        toaster.create({
            title: "✅ Профиль обновлён",
            type: "success",
            description: "Изменения успешно сохранены",
        });
        setIsEditing(false);
    };

    const handleNotifyToggle = async () => {
        const newNotify = !notify;

        await updateUser({email, telegram, notify: newNotify});

        setNotify(newNotify);

        toaster.create({
            title: "✅ Настройки уведомлений обновлены",
            type: "success",
            description: newNotify ? "Уведомления включены" : "Уведомления отключены",
        });
    };

    return (
        <Box className="page-container">

            <Stack gap={4} maxW="400px" mx="auto" mt={6}>
                <Text className={styles.label} mb={1}>Email для уведомлений<br/>и восстановления пароля</Text>
                <Input
                    ref={emailRef}
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEditing(true);
                    }}
                    className={styles.input}
                    mb={1}
                />
                {!email && (
                    <Text fontSize="sm" color="gray.400" mb={4}>
                        Email не указан
                    </Text>
                )}

                <Text className={styles.label} mb={1}>Имя пользователя Telegram</Text>
                <Input
                    placeholder="@example"
                    value={telegram}
                    onChange={(e) => {
                        setTelegram(e.target.value);
                        setIsEditing(true);
                    }}
                    className={styles.input}
                    mb={1}
                />
                {!telegram && (
                    <Box textAlign="center">
                        <Text fontSize="sm" color="gray.400" mb={4}>
                            Telegram не указан
                        </Text>
                    </Box>
                )}
                <Toggle
                    isChecked={notify}
                    onToggle={handleNotifyToggle}
                    label={<Text>Получать уведомления</Text>}
                />
                <Button
                    colorScheme="blue"
                    onClick={async () => {
                        if (!isEditing) {
                            setIsEditing(true);
                            setTimeout(() => {
                                emailRef.current?.focus();
                            }, 0);
                        } else {
                            await handleSave();
                        }
                    }}
                    className={styles.button}
                >
                    {isEditing ? "Сохранить изменения" : isProfileFilled ? "Редактировать" : "Сохранить изменения"}
                </Button>
            </Stack>
        </Box>
    );
};