import {useEffect, useRef, useState} from "react";
import {Box, Button, Heading, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./UpcomingPage.module.css";
import {useShows} from "hooks/api/useShows";
import {Toggle} from "components/ToggleFilter";
import {filterMoviesByYear} from "helpers/filterMovies";
import {Movie} from "hooks/types/Movie";
import {useUser} from "hooks/api/useUser";
import {ScrollToTopButton} from "components/ScrollToTopButton";
import {apiClient} from "helpers/apiClient.ts";


export const UpcomingPage = () => {
    const currentYear = new Date().getFullYear();
    const {addToFavoritesUpcoming} = useShows();
    const {mutateAsync: addToFavoritesAction} = addToFavoritesUpcoming;

    const {getMyFavorites} = useUser();
    const {data: favoriteMovies = []} = getMyFavorites();

    const [filterByCurrentYear, setFilterByCurrentYear] = useState(true);
    const [addedMovies, setAddedMovies] = useState<Set<number>>(new Set());
    const listRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setFilterByCurrentYear((prev) => !prev);
    };

    const handleAddToFavorites = async (movieId: number) => {
        await addToFavoritesAction(movieId);
        setAddedMovies((prev) => new Set(prev).add(movieId));
    };

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            const previousScroll = window.scrollY;
            try {
                const {data} = await apiClient.get("/shows/upcoming", {
                    params: {page},
                });
                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setMovies((prev) => {
                        const existingIds = new Set(prev.map(movie => movie.id));
                        const newMovies = data.filter((movie: Movie) => !existingIds.has(movie.id));
                        return [...prev, ...newMovies];
                    });
                }
                setTimeout(() => {
                    window.scrollTo({top: previousScroll, behavior: "auto"});
                }, 50);
            } catch (err) {
                console.error("Ошибка при загрузке фильмов:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    const filteredMovies = filterMoviesByYear(movies.filter(
        (movie) => !favoriteMovies.some((fav) => fav.id === movie.id)
    ), filterByCurrentYear);

    return (
        <>
            <Box className="page-container">
                <Heading as="h2" className={styles.heading}>
                    Фильмы, которые идут в Кинотеатрах
                </Heading>

                <Box className={styles.searchContainer}>
                    <Toggle
                        isChecked={filterByCurrentYear}
                        onToggle={handleToggle}
                        label={<Text>Только релизы {currentYear} года</Text>}
                    />
                </Box>

                {isLoading && <Text>Загрузка...</Text>}
                {!isLoading && filteredMovies.length === 0 && (
                    <Text className={styles.emptyMessage}>Нет фильмов, вышедших в этом году</Text>
                )}

                {!isLoading && filteredMovies.length > 0 && (
                    <Box ref={listRef}>
                        <SimpleGrid columns={{base: 1, md: 1, lg: 1}} gap={6} className={styles.grid}>
                            {filteredMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    actionButton={
                                        <Button
                                            onClick={() => handleAddToFavorites(movie.id)}
                                            disabled={addedMovies.has(movie.id)}
                                        >
                                            {addedMovies.has(movie.id) ? "✅ Добавлено" : "Добавить в избранное"}
                                        </Button>
                                    }
                                />
                            ))}
                        </SimpleGrid>
                    </Box>
                )}
                {hasMore && !isLoading && (
                    <Box textAlign="center" mt={4}>
                        <Button onClick={() => setPage((prev) => prev + 1)}>Показать ещё</Button>
                    </Box>
                )}
            </Box>
            <ScrollToTopButton/>
        </>
    );
};