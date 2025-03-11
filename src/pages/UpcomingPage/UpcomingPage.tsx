import {useState} from "react";
import {Box, Button, Heading, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./UpcomingPage.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useShows} from "hooks/api/useShows.ts";
import {ToggleFilter} from "components/ui/ToggleFilter.tsx";
import {filterMoviesByYear} from "helpers/filterMovies.ts";
import {Movie} from "hooks/types/Movie.ts";

export const UpcomingPage = () => {
    const {getUpcomingMovies, addToFavoritesUpcoming} = useShows();
    const {data: upcomingMovies = [], isFetching, refetch} = getUpcomingMovies();
    const {mutateAsync: addToFavoritesAction} = addToFavoritesUpcoming;

    const [filterByCurrentYear, setFilterByCurrentYear] = useState(false);
    const [addedMovies, setAddedMovies] = useState<Set<number>>(new Set());

    const handleToggle = () => {
        setFilterByCurrentYear((prev) => !prev);
    };

    const handleAddToFavorites = async (movieId: number) => {
        await addToFavoritesAction(movieId);
        setAddedMovies((prev) => new Set(prev).add(movieId));
    };

    const filteredMovies: Movie[] = filterMoviesByYear(upcomingMovies, filterByCurrentYear);

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>
                    <Box as="span" display="block">
                        Фильмы, которые идут в Кинотеатрах
                    </Box>
                    <Box as="span" display="block">
                        или выйдут в ближайший месяц
                    </Box>
                </Heading>

                <Box className={styles.searchContainer}>
                    <Button colorScheme="blue" onClick={() => refetch()}>
                        Обновить список
                    </Button>
                    <ToggleFilter isChecked={filterByCurrentYear} onToggle={handleToggle}/>
                </Box>

                {isFetching && <Text>Загрузка...</Text>}
                {!isFetching && filteredMovies.length === 0 && (
                    <Text className={styles.emptyMessage}>Нет фильмов, вышедших в этом году</Text>
                )}

                {!isFetching && filteredMovies.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                        {filteredMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button
                                        colorScheme={addedMovies.has(movie.id) ? "gray" : "green"}
                                        onClick={() => handleAddToFavorites(movie.id)}
                                        disabled={addedMovies.has(movie.id)}
                                    >
                                        {addedMovies.has(movie.id) ? "✅ Добавлено" : "Добавить в избранное"}
                                    </Button>
                                }
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </>
    );
};