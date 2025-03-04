import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserFavoriteResponse} from "hooks/types/User";
import {apiClient} from "helpers/apiClient.ts";

export const useUser = () => {
    const queryClient = useQueryClient();

    const getMyFavorites = () => {
        return useQuery<UserFavoriteResponse[]>({
            queryKey: ["myFavorites"],
            queryFn: async () => {
                const {data} = await apiClient.get("/users/me/favorites");
                return data;
            },
        });
    };

    const removeMyFavorite = useMutation({
        mutationFn: async (data: { id: number; type: "movie" | "tv" }) => {
            return await apiClient.delete(`/shows/${data.id}/favorites`, {
                data: {type: data.type},
            });
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData(["myFavorites"], (oldFavorites: UserFavoriteResponse[] = []) =>
                oldFavorites.filter((movie) => movie.id !== variables.id)
            );
        },
    });

    const addToFavorites = useMutation({
        mutationFn: async (data: { id: number; type: "movie" | "tv" }) => {
            const response = await apiClient.post(`/shows/${data.id}/favorites`, {
                type: data.type,
            });
            return response.data;
        },
        onSuccess: (newMovie) => {
            queryClient.setQueryData(["myFavorites"], (oldFavorites: UserFavoriteResponse[] = []) => {
                if (oldFavorites.some((movie) => movie.id === newMovie.id)) {
                    return oldFavorites; // Если фильм уже в списке, ничего не меняем
                }
                return [newMovie, ...oldFavorites]; // 🔥 Добавляем фильм в начало списка
            });
        },
    });

    const actions = {getMyFavorites, addToFavorites, removeMyFavorite};

    return {...actions};
};