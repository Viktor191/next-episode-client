import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {apiClient} from "helpers/apiClient";

export const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginUser = useMutation({
        mutationFn: async (data: { username: string; password: string }) => {
            const response = await apiClient.post("/auth/login", data);
            return response.data;
        },
        onSuccess: (response) => {
            localStorage.setItem("authToken", response.token);
            queryClient.invalidateQueries({queryKey: ["me"]});
            navigate("/upcoming");
        },
    });

    return {loginUser};
};