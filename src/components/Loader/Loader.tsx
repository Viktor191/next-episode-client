import {useState, useEffect} from "react";
import styles from "./Loader.module.css";

export const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 99 ? prev + 1 : 99));
        }, 30); // Обновление каждые 30ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.loaderContainer}>
            <p className={styles.timer}>Загрузка... {progress}%</p>
        </div>
    );
};