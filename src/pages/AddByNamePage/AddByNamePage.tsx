import {useState} from "react";
import {Box, Button, Heading, Input, Text, SimpleGrid} from "@chakra-ui/react";
import {apiClient} from "helpers/apiClient";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByName.module.css";
import {Movie} from "types/Movie";
import {NavigationBar} from "components/NavigationBar";

export const AddByNamePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [results, setResults] = useState<Movie[]>([]);
    const [message, setMessage] = useState<string>("");

    const handleSearch = () => {
        setMessage("");
        setResults([]);

        Promise.all([
            apiClient.get(`/shows/search/movie/${searchQuery}`),
            apiClient.get(`/shows/search/tv/${searchQuery}`)
        ])
            .then(([moviesResponse, tvResponse]) => {
                const combinedResults = [...moviesResponse.data, ...tvResponse.data];
                setResults(combinedResults); // Данные отобразятся, если они есть
            });
    };
    const handleAddToFavorites = (movie: Movie) => {
        setMessage("");

        apiClient.post(`/shows/${movie.id}/favorites`, {type: movie.media_type})
            .then((response) => setMessage(`✅ ${response.data.message}`));
    };

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>
                    Поиск фильма или сериала по названию
                </Heading>

                <Box className={styles.searchContainer}>
                    <Input
                        placeholder="Введите название фильма или сериала"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                {results.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                        {results.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button colorScheme="green" onClick={() => handleAddToFavorites(movie)}>
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