import {useMutation, useQuery} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient.ts";
import {Movie} from "types/Movie";
import {toaster} from "components/ui/toaster.tsx";

export const useShows = () => {
    const getUpcomingMovies = () => {
        return useQuery<Movie[]>({
            queryKey: ["upcomingMovies"],
            queryFn: async () => {
                const {data} = await apiClient.get("/shows/upcoming");
                return data;
            },
        });
    };

    const addToFavorites = useMutation({
        mutationFn: async (dbID: number) => {
            const [movieResponse, tvResponse] = await Promise.allSettled([
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
        onSuccess: (response) => {
            toaster.create({
                title: "Добавление в избранное",
                type: "success",
                description: response.message,
            });
        },
    });

    return {getUpcomingMovies, addToFavorites};
};