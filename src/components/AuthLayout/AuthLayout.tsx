import {ReactNode, FormEvent} from "react";
import {Box, chakra, Stack} from "@chakra-ui/react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export const AuthLayout = ({onSubmit, children}: AuthLayoutProps) => {
    return (
        <Box className="auth-page">
            <chakra.form className={styles.form} onSubmit={onSubmit}>
                <Stack gap="4">
                    {children}
                </Stack>
            </chakra.form>
        </Box>
    );
};