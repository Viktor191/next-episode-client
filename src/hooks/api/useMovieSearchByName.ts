import {useQuery} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient.ts";
import {Movie} from "types/Movie";

export const useMovieSearchByName = (searchTerm: string) => {
    return useQuery<Movie[]>({
        queryKey: ["movieSearch", searchTerm],
        queryFn: async () => {
            if (!searchTerm.trim()) return [];
            const [moviesResponse, tvResponse] = await Promise.all([
                apiClient.get(`/shows/search/movie/${searchTerm}`),
                apiClient.get(`/shows/search/tv/${searchTerm}`),
            ]);
            return [...moviesResponse.data, ...tvResponse.data];
        },
        enabled: !!searchTerm,
    });
};