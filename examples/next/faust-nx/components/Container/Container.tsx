import styles from './Container.module.scss';

type Props = {
  children: JSX.Element,
};

export default function Container({ children }: Props): JSX.Element {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}
