import {useState} from "react";
import {Box, Button, Heading, Input, Text} from "@chakra-ui/react";
import {MovieCard} from "components/MovieCard";
import styles from "./AddByImdbPage.module.css";
import {NavigationBar} from "components/NavigationBar";
import {useMovieSearch} from "hooks/api/useMovieSearch.ts";
import {useUser} from "hooks/api/useUser.ts";
import {toaster} from "components/ui/toaster"; // 👈 Импортируем тостер

export const AddByImdbPage = () => {
    const [imdbUrl, setImdbUrl] = useState<string>("");
    const [added, setAdded] = useState<boolean>(false); // ✅ Состояние для кнопки
    const {addToFavorites} = useUser();
    const {mutateAsync: addToFavoritesAction} = addToFavorites;

    const extractImdbId = (url: string): string | null => {
        const match = url.match(/tt\d+/);
        return match ? match[0] : null;
    };

    const imdbID = extractImdbId(imdbUrl);
    const {data: movieData, isFetching, error} = useMovieSearch(imdbID);

    const handleAddToFavorites = async () => {
        if (!movieData) return;

        try {
            await addToFavoritesAction({id: movieData.id, type: movieData.media_type});

            setAdded(true); // ✅ Меняем состояние кнопки
            toaster.create({ // ✅ Показываем уведомление
                title: "Добавлено!",
                type: "success",
                description: `${movieData.title} добавлен в избранное.`,
            });
        } catch {
            toaster.create({ // 🔴 Если ошибка
                title: "Ошибка",
                type: "error",
                description: "Не удалось добавить в избранное.",
            });
        }
    };

    return (
        <>
            <NavigationBar/>
            <Box className={styles.container}>
                <Heading as="h2" className={styles.heading}>Добавить фильм или сериал по IMDb ID</Heading>

                <Box className={styles.searchContainer}>
                    <Input
                        placeholder="Вставьте ссылку IMDb (например, https://www.imdb.com/title/tt0804484/)"
                        value={imdbUrl}
                        onChange={(e) => setImdbUrl(e.target.value)}
                        className={styles.input}
                    />

                    <Button colorScheme="blue" onClick={() => setImdbUrl(imdbUrl)}>
                        🔍 Найти
                    </Button>
                </Box>

                {isFetching && <Text>Загрузка...</Text>}
                {error && <Text color="red.500">❌ Ошибка при поиске</Text>}

                {movieData && (
                    <MovieCard
                        movie={movieData}
                        actionButton={
                            <Button
                                colorScheme={added ? "gray" : "green"}
                                onClick={handleAddToFavorites}
                                disabled={added} // ✅ Делаем кнопку неактивной после добавления
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