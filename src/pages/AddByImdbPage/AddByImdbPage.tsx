import {useState} from "react";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {apiClient} from "helpers/apiClient";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByImdbPage.module.css";
import {useNavigate} from "react-router-dom";
import {Movie} from "types/Movie";

export const AddByImdbPage = () => {
    const [imdbUrl, setImdbUrl] = useState<string>("");
    const [movieData, setMovieData] = useState<Movie | null>(null);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const extractImdbId = (url: string): string | null => {
        const match = url.match(/tt\d+/);
        return match ? match[0] : null;
    };

    const handleSearch = async () => {
        setMessage("");
        setMovieData(null);

        const imdbID = extractImdbId(imdbUrl);
        if (!imdbID) {
            setMessage("❌ Неверная ссылка. Убедитесь, что она содержит корректный IMDb ID.");
            return;
        }


        const response = await apiClient.get(`/shows/imdb/${imdbID}`);
        setMovieData(response.data);
        setMessage("");

    };

    const handleAddToFavorites = async (movie: Movie) => {
        setMessage("");

        const response = await apiClient.post(`/shows/${movie.id}/favorites`, {
            type: movie.media_type,
        });
        setMessage(`✅ ${response.data.message}`);

    };

    const handleNavigateToFavorites = () => {
        navigate("/favorites");
    };

    return (
        <Box className={styles.container}>
            <Heading as="h2" className={styles.heading}>
                Добавить фильм или сериал по IMDb ID
            </Heading>

            <Box className={styles.searchContainer}>
                <Button colorScheme="blue" onClick={handleNavigateToFavorites}>
                    Перейти к избранному
                </Button>

                <Input
                    placeholder="Вставьте ссылку IMDb (например, https://www.imdb.com/title/tt0804484/)"
                    value={imdbUrl}
                    onChange={(e) => setImdbUrl(e.target.value)}
                    className={styles.input}
                />

                <Button colorScheme="blue" onClick={handleSearch}>
                    🔍 Найти
                </Button>
            </Box>

            {message && (
                <Text color={message.includes("✅") ? "green.500" : "red.500"} mt={4}>
                    {message}
                </Text>
            )}

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