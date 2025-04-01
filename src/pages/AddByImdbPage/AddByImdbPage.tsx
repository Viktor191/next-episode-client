import {useEffect, useRef, useState, useMemo} from "react";
import {Box, Button, Heading, Input} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByImdbPage.module.css";
import {useUser} from "hooks/api/useUser";
import {useSearch} from "hooks/api/useSearch";

export const AddByImdbPage = () => {
    const [imdbUrl, setImdbUrl] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const {addToFavorites} = useUser();
    const {mutateAsync: addToFavoritesAction} = addToFavorites;

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        setIsButtonDisabled(false);
    }, [imdbUrl]);


    const imdbID = useMemo(() => {
        const match = imdbUrl.match(/tt\d+/);
        return match ? match[0] : null;
    }, [imdbUrl]);

    const {searchByImdbID} = useSearch();
    const {data: movieData} = searchByImdbID(imdbID);

    const handleAddToFavorites = async () => {
        if (!movieData) return;
        await addToFavoritesAction({id: movieData.id, type: movieData.media_type});
        setIsButtonDisabled(true);
    };

    const handleClear = () => {
        setImdbUrl("");
        inputRef.current?.focus();
    };

    return (
        <Box className="page-container">
            <Heading as="h2" className={styles.heading}>
                <a href="https://www.imdb.com" target="_blank" rel="noopener noreferrer">
                    Добавить фильм или сериал по ссылке на IMDb
                </a>
            </Heading>

            <Box className={styles.searchContainer}>
                <Box w="100%">
                    <Input
                        ref={inputRef}
                        placeholder="Вставьте ссылку IMDb (например, https://www.imdb.com/title/tt0804484/)"
                        value={imdbUrl}
                        onChange={(e) => setImdbUrl(e.target.value)}
                        className={styles.input}
                    />
                </Box>

                <Button colorScheme="red" onClick={handleClear}>
                    Очистить
                </Button>
            </Box>

            {movieData && (
                <MovieCard
                    movie={movieData}
                    actionButton={
                        <Button
                            colorScheme={isButtonDisabled ? "gray" : "green"}
                            onClick={handleAddToFavorites}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled ? "✅ Добавлено" : "Добавить в избранное"}
                        </Button>
                    }
                />
            )}
        </Box>
    );
};