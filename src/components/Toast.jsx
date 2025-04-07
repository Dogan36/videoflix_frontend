import styles from "./Toast.module.css";
import errorIcon from "@/assets/error_icon.svg"; // dein Icon-Pfad

function Toast({ message, buttonText, onAction, onClose, type }) {
    return (
      <div className={styles.toast}>
      
        <div className={`${styles.redBar} ${styles[type]}`}></div>
        <div className={styles.toastContent}>
        <img src={errorIcon} alt="Error" className={styles.icon} />
        <span className={styles.message}>{message}</span>
        {buttonText && (<button className={styles.actionButton} onClick={onAction}>{buttonText}</button>)}
        
        <div className={styles.seperator}></div>
        <button className={styles.close} onClick={onClose}>×</button>
        </div>
      </div>
    );
  }
  
  export default Toast;