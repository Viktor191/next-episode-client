import {useEffect, useState} from "react";
import {Box, Button, Heading, SimpleGrid, Text, Image} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {apiClient} from "helpers/apiClient";
import styles from "./FavoritesPage.module.css";

interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    vote_average?: number;
    release_date?: string;
    poster_path: string;
    media_type?: "movie" | "tv"
}

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
            try {
                const response = await apiClient.get("/users/me/favorites");
                console.log("Избранные данные с сервера:", response.data);
                console.table(response.data);
                setFavorites(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(`Ошибка: ${err.message}`);
                } else {
                    setError("Не удалось загрузить избранное.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const removeFavorite = async (id: number) => {
        try {
            await apiClient.delete(`/shows/${id}/favorites`);
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

            <Button onClick={handleLogout} colorScheme="red" className={styles.logoutButton}>
                Выйти
            </Button>

            {loading ? (
                <Text>Загрузка...</Text>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : favorites.length === 0 ? (
                <Text className={styles.emptyMessage}>Нет избранных фильмов или сериалов</Text>
            ) : (
                <SimpleGrid columns={{base: 1, md: 3}} gap={6} className={styles.grid}>
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onRemove={removeFavorite}/>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export const MovieCard = ({movie, onRemove}: { movie: Movie; onRemove: (tmdbId: number) => void }) => {
    return (
        <Box className={styles.card}>
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} (${movie.media_type === "movie" ? "Фильм" : "Сериал"})`}
                className={styles.image}
            />

            <Box className={styles.cardContent}>
                <Text className={styles.label}><strong>Название:</strong> {movie.title}</Text>
                <Text className={styles.label}><strong>Оригинальное
                    название:</strong> {movie.original_title || "Неизвестно"}</Text>
                <Text className={styles.label}><strong>Дата выхода:</strong> {movie.release_date || "Неизвестно"}</Text>
                <Text className={styles.label}><strong>Тип:</strong> {movie.media_type === "movie" ? "Фильм" : "Сериал"}
                </Text>
                <Text className={styles.label}><strong>Описание:</strong> {movie.overview || "Нет описания"}</Text>
                <Text className={styles.label}>
                    <strong>Рейтинг:</strong> {movie.vote_average ? `${movie.vote_average} / 10` : "Нет данных"}
                </Text>
            </Box>

            <Button colorScheme="red" onClick={() => onRemove(movie.id)}>
                Удалить
            </Button>
        </Box>
    );
};