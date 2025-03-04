import {Box, Button, Heading, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./UpcomingPage.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useShows} from "hooks/api/useShows.ts";

export const UpcomingPage = () => {
    const {getUpcomingMovies, addToFavorites} = useShows();

    const {data: upcomingMovies = [], isFetching, refetch} = getUpcomingMovies();
    const {mutateAsync: addToFavoritesAction} = addToFavorites;

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>
                    <Box as="span" display="block">Фильмы и сериалы, которые сейчас идут в Кинотеатрах</Box>
                    <Box as="span" display="block">или выйдут в ближайший месяц</Box>
                </Heading>

                <Box className={styles.searchContainer}>
                    <Button colorScheme="blue" onClick={() => refetch()}>
                        Обновить список
                    </Button>
                </Box>

                {isFetching && <Text>Загрузка...</Text>}
                {!isFetching && upcomingMovies.length === 0 && (
                    <Text className={styles.emptyMessage}>Нет предстоящих фильмов</Text>
                )}

                {!isFetching && upcomingMovies.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                        {upcomingMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button colorScheme="green" onClick={() => addToFavoritesAction(movie.id)}>
                                        Добавить в избранное
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