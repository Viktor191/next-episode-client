import { useState, FormEvent } from "react";

import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(""); // Очистка ошибки перед проверкой

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    console.log("Регистрация:", { username, password });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Логин:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Подтвердите пароль:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Зарегистрироваться
          </button>
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={() => (window.location.href = "/login")}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
