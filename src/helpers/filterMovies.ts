import {Movie} from "hooks/types/Movie.ts";

export const filterMoviesByYear = (movies: Movie[], filterByCurrentYear: boolean): Movie[] => {
    if (!filterByCurrentYear) return movies;

    const currentYear = new Date().getFullYear().toString(); // "2025"

    return movies.filter((movie) => movie.release_date?.startsWith(currentYear));
};