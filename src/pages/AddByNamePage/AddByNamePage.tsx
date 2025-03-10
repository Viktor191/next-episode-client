import {useState, useRef} from "react";
import {Box, Button, Heading, Input, Text, SimpleGrid} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByName.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useMovieSearchByName} from "hooks/api/useMovieSearch.ts";
import {useUser} from "hooks/api/useUser.ts";

export const AddByNamePage = () => {
    const [searchQuery, setSearchQuery] = useState<string>(""); // Ввод пользователя
    const [searchTerm, setSearchTerm] = useState<string>(""); // Фактический запрос
    const inputRef = useRef<HTMLInputElement>(null);
    const {data: results = [], isFetching, error} = useMovieSearchByName(searchTerm);

    const {addToFavorites} = useUser();
    const {mutateAsync: addToFavoritesAction} = addToFavorites;

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

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
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
                {error && <Text color="red.500">❌ Ошибка при поиске</Text>}

                {results.length > 0 && (
                    <SimpleGrid columns={{base: 1, md: 2, lg: 1}} gap={6} className={styles.grid}>
                        {results.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                actionButton={
                                    <Button colorScheme="green" onClick={() => addToFavoritesAction({
                                        id: movie.id,
                                        type: movie.media_type
                                    })}>
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