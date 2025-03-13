import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserFavoriteResponse} from "hooks/types/User";
import {apiClient} from "helpers/apiClient";
import {useGlobalStore} from "stores/useGlobalStore";

export const useUser = () => {
    const queryClient = useQueryClient();
    const {setToasterData} = useGlobalStore();

    const getMyFavorites = () => {
        return useQuery<UserFavoriteResponse[]>({
            queryKey: ["myFavorites"],
            queryFn: async () => {
                const {data} = await apiClient.get("/users/me/favorites");
                return data;
            },
            refetchOnWindowFocus: true,
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
        onMutate: async (newMovie) => {
            await queryClient.cancelQueries({queryKey: ["myFavorites"]});

            const previousFavorites = queryClient.getQueryData<UserFavoriteResponse[]>(["myFavorites"]) || [];

            queryClient.setQueryData(["myFavorites"], [...previousFavorites, {id: newMovie.id, type: newMovie.type}]);

            return {previousFavorites};
        },
        onSuccess: (newMovie) => {
            if (!newMovie || !newMovie.id) return;

            queryClient.setQueryData(["myFavorites"], (oldFavorites: UserFavoriteResponse[] = []) => {
                if (oldFavorites.some((movie) => movie.id === newMovie.id)) {
                    return oldFavorites;
                }
                return [newMovie, ...oldFavorites];
            });

            setToasterData({
                title: "Добавлено в избранное",
                type: "success",
                description: newMovie.message || "Фильм успешно добавлен в избранное!",
            });
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(["myFavorites"], context?.previousFavorites);
        },
    });

    return {getMyFavorites, addToFavorites, removeMyFavorite};
};