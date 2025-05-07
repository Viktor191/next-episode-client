import { FC, useState } from 'react';
import { Input, Box } from '@chakra-ui/react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordInput.module.css';

interface Props {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const PasswordInput: FC<Props> = ({
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box className={styles.passwordWrapper}>
      <Input
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        required={required}
      />
      <button
        type="button"
        className={styles.passwordToggle}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </Box>
  );
};
