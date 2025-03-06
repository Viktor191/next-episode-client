import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "helpers/apiClient.ts";
import {Movie} from "types/Movie";

export const useShows = () => {
    const queryClient = useQueryClient();

    const getUpcomingMovies = () => {
        return useQuery<Movie[]>({
            queryKey: ["upcomingMovies"],
            queryFn: async () => {
                const {data} = await apiClient.get("/shows/upcoming");
                return data;
            },
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        });
    };

    const addToFavorites = useMutation({
        mutationFn: async (dbID: number) => {
            const {data: showData} = await apiClient.get(`/shows/movie/${dbID}`);
            if (!showData) {
                throw new Error("Невозможно получить данные фильма");
            }

            const response = await apiClient.post(`/shows/${showData.id}/favorites`, {
                type: showData.media_type,
            });

            return {...response.data, id: showData.id, media_type: showData.media_type};//
        },
        onSuccess: (newFavorite) => {
            queryClient.setQueryData<Movie[]>(["upcomingMovies"], (oldMovies = []) => {
                if (oldMovies.some((movie) => movie.id === newFavorite.id)) {
                    return oldMovies;
                }
                return [newFavorite, ...oldMovies];
            });
        },
    });

    return {getUpcomingMovies, addToFavorites};
};