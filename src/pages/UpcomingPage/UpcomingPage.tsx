import {useState} from "react";
import {Box, Button, Heading, Text, SimpleGrid} from "@chakra-ui/react";
import {apiClient} from "helpers/apiClient";
import {MovieCard} from "components/MovieCard";
import styles from "./UpcomingPage.module.css";
import {useNavigate} from "react-router-dom";
import {Movie} from "types/Movie";

export const UpcomingPage = () => {
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleFetchUpcoming = () => {
        setMessage("");
        setUpcomingMovies([]);

        apiClient.get("/shows/upcoming").then((response) => {
            setUpcomingMovies(response.data);
        });
    };

    const handleAddToFavorites = (dbID: number) => {
        setMessage("Идет добавление в избранное...");

        Promise.allSettled([
            apiClient.get(`/shows/movie/${dbID}`),
            apiClient.get(`/shows/tv/${dbID}`),
        ]).then((responses) => {
            const movieResponse = responses[0];
            const tvResponse = responses[1];

            let showData;
            if (movieResponse.status === "fulfilled") {
                showData = movieResponse.value.data;
            } else if (tvResponse.status === "fulfilled") {
                showData = tvResponse.value.data;
            }

            if (!showData) {
                setMessage("❌ Не удалось определить тип (фильм/сериал) для добавления.");
                return;
            }

            apiClient
                .post(`/shows/${showData.id}/favorites`, {type: showData.media_type})
                .then((response) => setMessage(`✅ ${response.data.message}`));
        });
    };

    const handleNavigateToFavorites = () => {
        navigate("/favorites");
    };

    return (
        <Box className={styles.container}>
            <Heading as="h2" className={styles.heading}>
                Предстоящие фильмы и сериалы
            </Heading>

            <Box className={styles.searchContainer}>
                <Button colorScheme="blue" onClick={handleNavigateToFavorites}>
                    📋 Перейти к избранному
                </Button>
                <Button colorScheme="blue" onClick={handleFetchUpcoming}>
                    🔍 Показать предстоящие фильмы
                </Button>
            </Box>

            {message && (
                <Text color={message.includes("✅") ? "green.500" : "red.500"} mt={4}>
                    {message}
                </Text>
            )}

            {upcomingMovies.length > 0 && (
                <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                    {upcomingMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            actionButton={
                                <Button colorScheme="green" onClick={() => handleAddToFavorites(movie.id)}>
                                    Добавить в избранное
                                </Button>
                            }
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};