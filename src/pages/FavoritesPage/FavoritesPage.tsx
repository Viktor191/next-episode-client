import {Box, Button, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./FavoritesPage.module.css";
import {useUser} from "hooks/api/useUser";
import {useEffect} from "react";
import {ScrollToTopButton} from "components/ScrollToTopButton";

export const FavoritesPage = () => {
    const {getMyFavorites, removeMyFavorite} = useUser();
    const {data: favorites = [], isFetching, refetch} = getMyFavorites();
    const {mutateAsync: removeMyFavoriteAction} = removeMyFavorite;

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            <Box className="page-container">
                <Heading as="h2" className={styles.heading}>Избранное</Heading>
                <Box className={styles.searchContainer}>
                    <Button colorScheme="blue" onClick={() => refetch()}>
                        Обновить список
                    </Button>
                </Box>
                {!isFetching && favorites.length === 0 && (
                    <Text className={styles.emptyMessage}>Нет избранных фильмов или сериалов</Text>
                )}
                {!isFetching && favorites.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 1}} gap={6} className={styles.grid}>
                        {favorites
                            ?.filter((movie) => movie !== undefined && movie !== null)
                            .slice()
                            .reverse()
                            .map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    actionButton={
                                        <Button
                                            onClick={() => removeMyFavoriteAction({
                                                id: movie.id,
                                                type: movie.media_type!,
                                            })}
                                            aria-label={`Удалить ${movie.title} из избранного`}
                                        >
                                            ✖
                                        </Button>
                                    }
                                />
                            ))}
                    </SimpleGrid>
                )}
            </Box>
            <ScrollToTopButton/>
        </>
    );
};