import {ChangeEvent, FC, InputHTMLAttributes, useEffect, useRef} from "react";
import styles from "./ClearableInputWithIcon.module.css";
import {Search} from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    showSearchIcon?: boolean;
    onSearchClick?: () => void;
    autoFocus?: boolean;
}

export const ClearableInputWithIcon: FC<Props> = ({
                                                      value,
                                                      onChange,
                                                      onClear,
                                                      placeholder,
                                                      showSearchIcon = false,
                                                      onSearchClick,
                                                      ...rest
                                                  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (rest.autoFocus) {
            inputRef.current?.focus();
        }
    }, [rest.autoFocus]);


    return (
        <div className={styles.inputWrapper}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && onSearchClick) {
                        onSearchClick();
                    }
                }}
                placeholder={placeholder}
                className={styles.input}
                autoFocus
                {...rest}
            />

            {value && (
                <button
                    type="button"
                    onClick={() => {
                        onClear();
                        inputRef.current?.focus();
                    }}
                    className={styles.clearButton}
                    aria-label="Очистить"
                >
                    ×
                </button>
            )}

            {showSearchIcon && (
                <button
                    type="button"
                    className={styles.iconWrapper}
                    onClick={onSearchClick}
                    aria-label="Найти"
                >
                    <Search size={18}/>
                </button>
            )}
        </div>
    );
};