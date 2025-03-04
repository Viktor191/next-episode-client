import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient.ts";
import {Movie} from "types/Movie";

export const useShows = () => {
    // Получаем список предстоящих фильмов
    const getUpcomingMovies = () => {
        return useQuery<Movie[]>({
            queryKey: ["upcomingMovies"],
            queryFn: async () => {
                const {data} = await apiClient.get("/shows/upcoming");
                return data;
            },
            staleTime: 1000 * 60 * 10, // 10 минут кэш
        });
    };

    const addToFavorites = useMutation({
        mutationFn: async (dbID: number) => {
            const [movieResponse, tvResponse] = await Promise.allSettled([// определяем тип фильма или сериала
                apiClient.get(`/shows/movie/${dbID}`),
                apiClient.get(`/shows/tv/${dbID}`),
            ]);

            let showData;
            if (movieResponse.status === "fulfilled") {
                showData = movieResponse.value.data;
            } else if (tvResponse.status === "fulfilled") {
                showData = tvResponse.value.data;
            }

            if (!showData) {
                throw new Error("Невозможно определить тип (фильм/сериал)");
            }

            const response = await apiClient.post(`/shows/${showData.id}/favorites`, {
                type: showData.media_type,
            });

            return response.data;
        },
    });

    return {getUpcomingMovies, addToFavorites};
};