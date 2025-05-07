import styles from 'components/User/User.module.css';

interface Props {
  name: string;
}

export const User = (props: Props) => {
  return <div className={styles.root}>{props.name}</div>;
};
