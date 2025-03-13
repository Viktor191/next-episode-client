import {useQuery} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient";
import {Movie} from "hooks/types/Movie";

export const useSearch = () => {
    const searchByImdbID = (imdbID: string | null) => {
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

    const searchByName = (searchTerm: string) => {
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

    return {searchByImdbID, searchByName};
};