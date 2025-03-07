import {Box, Image, Text} from "@chakra-ui/react";
import styles from "./MovieCard.module.css";
import {Movie} from "hooks/types/Movie.ts";

interface MovieCardProps {
    movie: Movie;
    actionButton?: React.ReactNode;
}

export const MovieCard = ({movie, actionButton}: MovieCardProps) => {
    const getMediaType = (type?: string): string => {
        if (type === "movie") return "Фильм";
        if (type === "tv") return "Сериал";
        return ""; // Пустая строка для всех остальных случаев
    };

    return (
        <Box className={styles.card}>
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} (${getMediaType(movie.media_type)})`}
                className={styles.image}
            />
            <Box className={styles.cardContent}>
                <Text className={styles.label}><strong>Название:</strong> {movie.title}</Text>
                <Text className={styles.label}>
                    <strong>Оригинальное название:</strong> {movie.original_title || "Неизвестно"}
                </Text>
                <Text className={styles.label}>
                    <strong>Дата выхода:</strong> {movie.release_date || "Неизвестно"}
                </Text>
                <Text className={styles.label}>
                    <strong>Тип:</strong> {getMediaType(movie.media_type)}
                </Text>
                <Text className={styles.label}>
                    <strong>Описание:</strong> {movie.overview || "Нет описания"}
                </Text>
                <Text className={styles.label}>
                    <strong>Рейтинг:</strong> {movie.vote_average ? `${movie.vote_average} / 10` : "Нет данных"}
                </Text>
            </Box>
            {actionButton && <Box className={styles.actionButton}>{actionButton}</Box>}
        </Box>
    );
};