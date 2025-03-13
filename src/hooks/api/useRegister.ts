import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {apiClient} from "helpers/apiClient";
import {toaster} from "components/ui/toaster";

export const useRegister = () => {
    const navigate = useNavigate();

    const registerUser = useMutation({
        mutationFn: async (data: { username: string; password: string }) => {
            const response = await apiClient.post("/auth/register", data);
            return response.data;
        },
        onSuccess: () => {
            toaster.create({
                title: "Регистрация успешна",
                type: "success",
                description: "Вы успешно зарегистрировались!",
            });
            navigate("/login");
        },
    });

    return {registerUser};
};