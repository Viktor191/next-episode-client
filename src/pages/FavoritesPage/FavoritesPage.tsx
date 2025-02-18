import {useState} from "react";
import {Box, Button, Heading, SimpleGrid, Text, Image} from "@chakra-ui/react";
import styles from "./FavoritesPage.module.css";

interface Movie {
    id: string;
    title: string;
    original_title?: string;
    overview: string;
    vote_average?: number;
    release_date?: string;
    posterPath: string;
}

export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Movie[]>([
        {
            id: "1",
            title: "Интерстеллар",
            original_title: "Interstellar",
            overview: "Фильм о путешествиях в космосе, времени и надежде.",
            release_date: "2014-11-07",
            vote_average: 8.6,
            posterPath: "https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
        },
        {
            id: "2",
            title: "Терминатор 2: Судный день",
            original_title: "Terminator 2: Judgment Day",
            overview: "Фильм о битве против машин и судьбе человечества.",
            release_date: "1991-07-03",
            vote_average: 8.5,
            posterPath: "https://image.tmdb.org/t/p/w500/weVXMD5QBGeQil4HEATZqAkXeEc.jpg",
        },
        {
            id: "3",
            title: "Матрица",
            original_title: "The Matrix",
            overview: "История о виртуальном мире и пробуждении разума.",
            release_date: "1999-03-31",
            vote_average: 8.7,
            posterPath: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        },
    ]);

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((movie) => movie.id !== id));
    };

    return (
        <Box className={styles.container}>
            <Heading as="h2" className={styles.heading}>
                Избранные фильмы
            </Heading>

            {favorites.length === 0 ? (
                <Text className={styles.emptyMessage}>Нет избранных фильмов</Text>
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

export const MovieCard = ({movie, onRemove}: { movie: Movie; onRemove: (id: string) => void }) => {
    return (
        <Box className={styles.card}>
            <Image src={movie.posterPath} alt={movie.title} className={styles.image}/>

            <Box className={styles.cardContent}>
                <Text className={styles.label}><strong>Название:</strong> {movie.title}</Text>
                <Text className={styles.label}><strong>Оригинальное название:</strong> {movie.original_title}</Text>
                <Text className={styles.label}><strong>Дата выхода:</strong> {movie.release_date}</Text>
                <Text className={styles.label}><strong>Описание:</strong> {movie.overview}</Text>
                <Text className={styles.label}><strong>Рейтинг:</strong> {movie.vote_average} / 10</Text>
            </Box>

            <Button className={styles.removeButton} onClick={() => onRemove(movie.id)}>
                Удалить
            </Button>
        </Box>
    );
};