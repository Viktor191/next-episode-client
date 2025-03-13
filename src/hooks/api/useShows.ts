import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient";
import {Movie} from "hooks/types/Movie";
import {toaster} from "components/ui/toaster";

export const useShows = () => {
    const queryClient = useQueryClient();

    const getUpcomingMovies = () => {
        return useQuery<Movie[]>({
            queryKey: ["upcomingMovies"],
            queryFn: async () => {
                const {data} = await apiClient.get("/shows/upcoming");
                return data;
            },
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

            return {...response.data, id: showData.id, media_type: showData.media_type};
        },
        onSuccess: (newFavorite) => {
            queryClient.setQueryData<Movie[]>(["upcomingMovies"], (oldMovies = []) =>
                oldMovies.map((movie) =>
                    movie.id === newFavorite.id ? {...movie, isAdded: true} : movie
                )
            );
            toaster.create({
                title: "Добавлено в избранное",
                type: "success",
                description: "Фильм добавлен в избранное!",
            });
        },
    });

    return {getUpcomingMovies, addToFavoritesUpcoming};
};