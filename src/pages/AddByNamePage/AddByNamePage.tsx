import {useState, useRef, useEffect} from "react";
import {Box, Button, Heading, Input, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByName.module.css";
import {useUser} from "hooks/api/useUser";
import {useSearch} from "hooks/api/useSearch";
import {ScrollToTopButton} from "components/ScrollToTopButton";

export const AddByNamePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>(""); // Ввод пользователя
    const [searchTerm, setSearchTerm] = useState<string>(""); // Фактический запрос
    const inputRef = useRef<HTMLInputElement>(null);

    const {searchByName} = useSearch();
    const {data: results = [], isFetching} = searchByName(searchTerm);

    const {addToFavorites} = useUser();
    const {mutateAsync: addToFavoritesAction} = addToFavorites;

    const [addedMovies, setAddedMovies] = useState<Set<number>>(new Set()); // Множество добавленных фильмов

    const handleSearch = () => {
        setSearchTerm(searchQuery);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        setSearchTerm("");
        inputRef.current?.focus();
    };

    const handleAddToFavorites = async (movieId: number, mediaType: 'tv' | 'movie') => {
        await addToFavoritesAction({id: movieId, type: mediaType});
        setAddedMovies((prev) => new Set(prev).add(movieId));
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <Box className="page-container">
                <Heading as="h2" className={styles.heading}>Поиск фильма или сериала по названию</Heading>

                <Box className={styles.searchContainer}>
                    <Input
                        ref={inputRef}
                        placeholder="Введите название фильма или сериала"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={styles.input}
                    />

                    <Button colorScheme="blue" onClick={handleSearch}>
                        🔍 Найти
                    </Button>

                    <Button colorScheme="red" onClick={handleClear}>
                        Очистить
                    </Button>
                </Box>

                {isFetching && <Text>Загрузка...</Text>}

                {results.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                        {results.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button
                                        colorScheme={addedMovies.has(movie.id) ? "gray" : "green"}
                                        onClick={() => handleAddToFavorites(movie.id, movie.media_type)}
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
            <ScrollToTopButton/>
        </>
    );
};