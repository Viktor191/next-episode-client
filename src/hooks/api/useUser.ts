import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserFavoriteResponse} from "hooks/types/User";
import {apiClient} from "helpers/apiClient.ts";


export const useUser = () => {
    const queryClient = useQueryClient();


    const getMyFavorites = () => {
        return useQuery<UserFavoriteResponse[]>({
            queryKey: ["myFavorites"],
            queryFn: async () => {
                const {data} = await apiClient.get("/users/me/favorites");
                return data;
            },
        });
    }
    
    const removeMyFavorite = useMutation({
        mutationFn: async (data: {
            id: number;
            type: "movie" | "tv";
        }) => {
            return await apiClient.delete(`/shows/${data.id}/favorites`, {
                data: {type: data.type},
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["myFavorites"]});
        }
    });

    const actions = {getMyFavorites, removeMyFavorite};


    return {...actions}
}