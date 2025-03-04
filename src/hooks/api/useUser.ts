import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserFavoriteResponse} from "hooks/types/User";
import {apiClient} from "helpers/apiClient.ts";
import {toaster} from "components/ui/toaster.tsx";

export const useUser = () => {
    const queryClient = useQueryClient();

    const getMyFavorites = () => {
        return useQuery<UserFavoriteResponse[]>({
            queryKey: ["myFavorites"],
            queryFn: async () => {
                const {data} = await apiClient.get("/users/me/favorites");
                return data;
            },
            refetchOnMount: true,
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
            // console.log("Фильм успешно добавлен:", newMovie);
            // if (!newMovie || !newMovie.id || !newMovie.title) return;

            queryClient.setQueryData(["myFavorites"], (oldFavorites: UserFavoriteResponse[] = []) => {
                if (oldFavorites.some((movie) => movie.id === newMovie.id)) {
                    return oldFavorites;
                }
                return [newMovie, ...oldFavorites];
            });
            setTimeout(() => {
                toaster.create({
                    title: "Добавление в избранное",
                    type: "success",
                    description: newMovie.message || "Фильм добавлен в избранное!",
                });
            }, 100);
        }
    });

    const actions = {getMyFavorites, addToFavorites, removeMyFavorite};

    return {...actions};
};