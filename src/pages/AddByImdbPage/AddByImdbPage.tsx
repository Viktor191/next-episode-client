import {useState} from "react";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {apiClient} from "helpers/apiClient";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByImdbPage.module.css";

interface Movie {
    id: number;
    title: string;
    original_title?: string;
    overview: string;
    vote_average?: number;
    release_date?: string;
    poster_path: string;
    media_type: "movie" | "tv";
}

export const AddByImdbPage = () => {
    const [imdbUrl, setImdbUrl] = useState<string>("");
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const [error, setError] = useState<string>("");

    // 🔍 Извлекаем IMDb ID из URL
    const extractImdbId = (url: string): string | null => {
        const match = url.match(/tt\d+/);
        return match ? match[0] : null;
    };

    // 📡 Обработчик поиска фильма/сериала по IMDb ID
    const handleSearch = async () => {
        setError("");
        setMovieData(null);

        const imdbID = extractImdbId(imdbUrl);
        if (!imdbID) {
            setError("Неверная ссылка. Убедитесь, что она содержит корректный IMDb ID.");
            return;
        }

        try {
            const response = await apiClient.get(`/shows/imdb/${imdbID}`);
            setMovieData(response.data);
        } catch (err) {
            setError(`Ошибка при поиске: ${(err as Error).message}`);
        }
    };

    const handleAddToFavorites = async (movie: Movie) => {
        try {
            console.log("Отправляемые данные:", {type: movie.media_type}); // 🔍 Проверим данные перед запросом
            await apiClient.post(`/shows/${movie.id}/favorites`, {
                type: movie.media_type, // 🟢 id не нужен в теле запроса
            });
            alert("✅ Успешно добавлено в избранное");
        } catch (err: unknown) {
            console.error("Ошибка при добавлении в избранное:", (err as Error).message);
            alert(`❌ Ошибка при добавлении в избранное: ${(err as Error).message}`);
        }
    };

    return (
        <Box className={styles.container}>
            <Heading as="h2" className={styles.heading}>
                Добавить фильм или сериал по IMDb ID
            </Heading>

            {/* 🔗 Поле ввода ссылки IMDb */}
            <Input
                placeholder="Вставьте ссылку IMDb (например, https://www.imdb.com/title/tt0804484/)"
                value={imdbUrl}
                onChange={(e) => setImdbUrl(e.target.value)}
                className={styles.input}
            />

            <Button colorScheme="blue" mt={4} onClick={handleSearch}>
                🔍 Найти
            </Button>

            {/* ⚡ Ошибка, если что-то пошло не так */}
            {error && <Text color="red.500">{error}</Text>}

            {/* 🎬 Карточка найденного фильма или сериала */}
            {movieData && (
                <MovieCard
                    movie={movieData}
                    actionButton={
                        <Button colorScheme="green" onClick={() => handleAddToFavorites(movieData)}>
                            Добавить в избранное
                        </Button>
                    }
                />
            )}
        </Box>
    );
};