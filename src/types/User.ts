export interface UserFavoriteResponse {
  id: number;
  overview: string;
  vote_average: number;
  title: string;
  original_title: string;
  release_date: string;
  poster_path?: string;
  media_type: 'movie' | 'tv';
}
