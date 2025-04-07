import styles from "./ToastWrapper.module.css";

function ToastWrapper({ children }) {
  return (
    <div className={styles.overlay}>
      {children}
    </div>
  );
}

export default ToastWrapper;