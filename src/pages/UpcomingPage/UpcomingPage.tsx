import {useState} from "react";
import {Box, Button, Heading, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./UpcomingPage.module.css";
import {useShows} from "hooks/api/useShows";
import {ToggleFilter} from "components/ToggleFilter/ToggleFilter";
import {filterMoviesByYear} from "helpers/filterMovies";
import {Movie} from "hooks/types/Movie";
import {useUser} from "hooks/api/useUser";


export const UpcomingPage = () => {
    const {getUpcomingMovies, addToFavoritesUpcoming} = useShows();
    const {data: upcomingMovies = [], isFetching, refetch} = getUpcomingMovies();
    const {mutateAsync: addToFavoritesAction} = addToFavoritesUpcoming;

    const {getMyFavorites} = useUser();
    const {data: favoriteMovies = []} = getMyFavorites();

    const [filterByCurrentYear, setFilterByCurrentYear] = useState(true);
    const [addedMovies, setAddedMovies] = useState<Set<number>>(new Set());

    const handleToggle = () => {
        setFilterByCurrentYear((prev) => !prev);
    };

    const handleAddToFavorites = async (movieId: number) => {
        await addToFavoritesAction(movieId);
        setAddedMovies((prev) => new Set(prev).add(movieId));
    };
    const filteredMoviesFav = upcomingMovies.filter(
        (movie) => !favoriteMovies.some((fav) => fav.id === movie.id)
    );

    const filteredMovies: Movie[] = filterMoviesByYear(filteredMoviesFav, filterByCurrentYear);


    return (
        <>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>
                    <Box as="span" display="block">
                        Фильмы, которые идут в Кинотеатрах
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