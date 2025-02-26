import {Box, Button, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./FavoritesPage.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useUser} from "hooks/api/useUser.ts";

export const FavoritesPage = () => {
    const {getMyFavorites, removeMyFavorite} = useUser();
    const {data: favorites, isFetching} = getMyFavorites();
    const {mutateAsync: removeMyFavoriteAction} = removeMyFavorite;
    
    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>Избранное</Heading>
                {isFetching ? (
                    <Text>Загрузка...</Text>
                ) : favorites?.length === 0 ? (
                    <Text className={styles.emptyMessage}>Нет избранных фильмов или сериалов</Text>
                ) : (
                    <SimpleGrid columns={{base: 1, md: 1}} gap={6} className={styles.grid}>
                        {favorites?.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button colorScheme="red"
                                            onClick={() => removeMyFavoriteAction({
                                                id: movie.id,
                                                type: movie.media_type!
                                            })}>
                                        X
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