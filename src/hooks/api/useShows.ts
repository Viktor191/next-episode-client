import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient";
import {Movie} from "hooks/types/Movie";
import {useGlobalStore} from "stores/useGlobalStore";


export const useShows = () => {
    const queryClient = useQueryClient();
    const {setToasterData} = useGlobalStore();

    const getUpcomingMovies = () => {
        return useQuery<Movie[]>({
            queryKey: ["upcomingMovies"],
            queryFn: async () => {
                const {data} = await apiClient.get("/shows/upcoming");
                return data;
            },
            staleTime: 1000 * 60 * 5,
        });
    };

    const addToFavoritesUpcoming = useMutation({
        mutationFn: async (dbID: number) => {
            const {data: showData} = await apiClient.get(`/shows/movie/${dbID}`);
            if (!showData) {
                throw new Error("Невозможно получить данные фильма");
            }

            const response = await apiClient.post(`/shows/${showData.id}/favorites`, {
                type: showData.media_type,
            });

            // Возвращаем объединённые данные
            return {...response.data, id: showData.id, media_type: showData.media_type};
        },
        onSuccess: (newFavorite) => {
            queryClient.setQueryData<Movie[]>(["upcomingMovies"], (oldMovies = []) =>
                oldMovies.map((movie) =>
                    movie.id === newFavorite.id ? {...movie, isAdded: true} : movie
                )
            );
            setToasterData({
                title: "Добавлено в избранное",
                type: "success",
                description: "Фильм успешно добавлен в избранное!",
            });
        },
    });

    return {getUpcomingMovies, addToFavoritesUpcoming};
};