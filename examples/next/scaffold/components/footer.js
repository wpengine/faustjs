import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Powered by{" "}
      <a href="https://wpengine.com" target="_blank" rel="noopener noreferrer">
        WP Engine
      </a>
    </footer>
  );
}
