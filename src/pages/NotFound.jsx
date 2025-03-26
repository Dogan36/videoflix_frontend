import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/" className={styles.button}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
