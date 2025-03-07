import {useQuery} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient.ts";
import {Movie} from "hooks/types/Movie.ts";

export const useMovieSearch = (imdbID: string | null) => {
    return useQuery<Movie>({
        queryKey: ["movieSearch", imdbID],
        queryFn: async () => {
            if (!imdbID) throw new Error("IMDb ID отсутствует");

            const {data} = await apiClient.get(`/shows/imdb/${imdbID}`);
            return data;
        },
        enabled: !!imdbID,
        staleTime: 1000 * 60 * 5,
    });
};