import {useEffect, useState} from "react";
import {Box, Button, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {apiClient} from "helpers/apiClient";
import {MovieCard} from "components/MovieCard";
import styles from "./FavoritesPage.module.css";
import {Movie} from "types/Movie";
import {NavigationBar} from "components/NavigationBar";

export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchFavorites = async () => {

            const response = await apiClient.get("/users/me/favorites");
            setFavorites(response.data);

            setLoading(false);

        }
        fetchFavorites();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const handleNavigateToImdbSearch = () => {
        navigate("/imdbSearch");
    };

    const removeFavorite = async (id: number, type: "movie" | "tv") => {
        try {
            await apiClient.delete(`/shows/${id}/favorites`, {
                data: {type},
            });
            setFavorites(favorites.filter((movie) => movie.id !== id));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Ошибка при удалении фильма: ${err.message}`);
            } else {
                setError("Ошибка при удалении фильма.");
            }
        }
    };

    return (
        <Box className={styles.container}>
            <Heading as="h2" className={styles.heading}>Избранное</Heading>
            <NavigationBar onLogout={handleLogout}/>
            <Box display="flex" gap="10px" mb={4}>
                <Button onClick={handleLogout} colorScheme="red" className={styles.logoutButton}>
                    Выйти
                </Button>
                <Button onClick={handleNavigateToImdbSearch} colorScheme="blue">
                    🔍 Добавить по IMDb ID
                </Button>
            </Box>

            {loading ? (
                <Text>Загрузка...</Text>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : favorites.length === 0 ? (
                <Text className={styles.emptyMessage}>Нет избранных фильмов или сериалов</Text>
            ) : (
                <SimpleGrid columns={{base: 1, md: 1}} gap={6} className={styles.grid}>
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            actionButton={
                                <Button colorScheme="red" onClick={() => removeFavorite(movie.id, movie.media_type!)}>
                                    X
                                </Button>
                            }
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};