import styles from "./Header.module.css";

function HomeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>VIDEOFLIX</h1>
        <button className={styles.logoutButton}>Log Out</button>
      </div>
    </header>
  );
}

export default HomeHeader;
