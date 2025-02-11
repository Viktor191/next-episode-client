import { useState, FormEvent } from "react";

import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Попытка входа:", username, password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>
      <form onSubmit={handleLogin} className={styles.form}>
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
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.button}>
            Войти
          </button>
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={() => (window.location.href = "/register")}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};
