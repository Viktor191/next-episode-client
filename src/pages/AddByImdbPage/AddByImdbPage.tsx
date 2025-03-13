import {useEffect, useRef, useState} from "react";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByImdbPage.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useUser} from "hooks/api/useUser";
import {Movie} from "hooks/types/Movie";
import {useSearch} from "hooks/api/useSearch";

export const AddByImdbPage = () => {
    const [imdbUrl, setImdbUrl] = useState<string>("");
    const [added, setAdded] = useState<boolean>(false);
    const [storedMovie, setStoredMovie] = useState<Movie | null>(null);

    const {addToFavorites} = useUser();
    const {mutateAsync: addToFavoritesAction, isSuccess} = addToFavorites;

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const extractImdbId = (url: string): string | null => {
        const match = url.match(/tt\d+/);
        return match ? match[0] : null;
    };

    const imdbID = extractImdbId(imdbUrl);

    const {searchByImdbID} = useSearch();
    const {data: movieData, isFetching} = searchByImdbID(imdbID);

    if (movieData && !storedMovie) {
        setStoredMovie(movieData);
    }

    useEffect(() => {
        if (isSuccess) {
            setAdded(true);
        }
    }, [isSuccess]);

    const handleAddToFavorites = async () => {
        if (!storedMovie) return;

        try {
            await addToFavoritesAction({id: storedMovie.id, type: storedMovie.media_type});
        } catch (err) {
            console.error("Ошибка добавления в избранное:", err);
        }
    };

    const handleClear = () => {
        setImdbUrl("");
        setStoredMovie(null);
        setAdded(false);
        inputRef.current?.focus();
    };

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>
                    Добавить фильм или сериал по IMDb ID
                </Heading>

                <Box className={styles.searchContainer}>
                    <Input
                        ref={inputRef}
                        placeholder="Вставьте ссылку IMDb (например, https://www.imdb.com/title/tt0804484/)"
                        value={imdbUrl}
                        onChange={(e) => setImdbUrl(e.target.value)}
                        className={styles.input}
                    />

                    <Button colorScheme="red" onClick={handleClear}>
                        Очистить
                    </Button>
                </Box>

                {isFetching && <Text>Загрузка...</Text>}

                {storedMovie && (
                    <MovieCard
                        movie={storedMovie}
                        actionButton={
                            <Button
                                colorScheme={added ? "gray" : "green"}
                                onClick={handleAddToFavorites}
                                disabled={added}
                            >
                                {added ? "✅ Добавлено" : "Добавить в избранное"}
                            </Button>
                        }
                    />
                )}
            </Box>
        </>
    );
};