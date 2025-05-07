import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserFavoriteResponse } from '../../types/User';
import { apiClient } from 'helpers/apiClient';
import { toaster } from 'components/ui/toaster';

export const useUser = () => {
  const queryClient = useQueryClient();

  const useGetMyFavorites = () => {
    return useQuery<UserFavoriteResponse[]>({
      queryKey: ['myFavorites'],
      queryFn: async () => {
        const { data } = await apiClient.get('/users/me/favorites');
        return data;
      },
      refetchOnWindowFocus: true,
    });
  };

  const removeMyFavorite = useMutation({
    mutationFn: async (data: { id: number; type: 'movie' | 'tv' }) => {
      return apiClient.delete(`/shows/${data.id}/favorites`, {
        data: { type: data.type },
      });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['myFavorites'], (oldFavorites: UserFavoriteResponse[] = []) =>
        oldFavorites.filter((movie) => movie.id !== variables.id)
      );
    },
  });

  const addToFavorites = useMutation({
    mutationFn: async (data: { id: number; type: 'movie' | 'tv' }) => {
      const response = await apiClient.post(`/shows/${data.id}/favorites`, {
        type: data.type,
      });

      return response.data;
    },
    onSuccess: (newMovie) => {
      queryClient.setQueryData(['myFavorites'], (oldFavorites: UserFavoriteResponse[] = []) => {
        if (oldFavorites.some((movie) => movie.id === newMovie.id)) {
          return oldFavorites;
        }
        return [newMovie, ...oldFavorites];
      });

      toaster.create({
        title: 'Добавлено в избранное',
        type: 'success',
        description: newMovie.message || 'Фильм успешно добавлен в избранное!',
      });
    },
  });

  const useGetMe = () => {
    return useQuery({
      queryKey: ['me'],
      queryFn: async () => {
        const { data } = await apiClient.get('/users/me');
        return data;
      },
      refetchOnMount: true,
      staleTime: 0,
    });
  };

  const updateUserProfile = useMutation({
    mutationFn: async (updateData: { email?: string; telegram?: string; notify?: boolean }) => {
      const { data } = await apiClient.patch('/users/me', updateData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }); // 🔄 автоматически обновим кэш useGetMe
    },
  });

  return {
    getMyFavorites: useGetMyFavorites,
    addToFavorites,
    removeMyFavorite,
    getMe: useGetMe,
    updateUserProfile,
  };
};
