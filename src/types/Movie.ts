export interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    vote_average?: number;
    release_date?: string;
    poster_path?: string | undefined;
    media_type: "movie" | "tv";
}