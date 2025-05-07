import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from 'helpers/apiClient';
import { Movie } from '../../types/Movie';
import { toaster } from 'components/ui/toaster';

export const useShows = () => {
  const useGetUpcomingMovies = () => {
    return useQuery<Movie[]>({
      queryKey: ['upcomingMovies'],
      queryFn: async () => {
        const { data } = await apiClient.get('/shows/upcoming');
        return data;
      },
    });
  };

  const addToFavoritesUpcoming = useMutation({
    mutationFn: async (dbID: number) => {
      const { data: showData } = await apiClient.get(`/shows/movie/${dbID}`);
      if (!showData) {
        throw new Error('Невозможно получить данные фильма');
      }

      const response = await apiClient.post(`/shows/${showData.id}/favorites`, {
        type: showData.media_type,
      });

      return { ...response.data, id: showData.id, media_type: showData.media_type };
    },
    onSuccess: () => {
      toaster.create({
        title: 'Добавлено в избранное',
        type: 'success',
        description: 'Фильм добавлен в избранное!',
      });
    },
  });

  return { getUpcomingMovies: useGetUpcomingMovies, addToFavoritesUpcoming };
};
