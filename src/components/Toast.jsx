import styles from "./Toast.module.css";
import errorIcon from "@/assets/error_icon.svg"; // dein Icon-Pfad
import successIcon from "@/assets/success_icon.png"; // dein Icon-Pfad
function Toast({ message, buttonText, onAction, onClose, type }) {
    return (
      <div className={styles.toast}>
      
        <div className={`${styles.redBar} ${styles[type]}`}></div>
        <div className={styles.toastContent}>
        {type === "error" && (
          <img src={errorIcon} alt="Error" className={styles.icon} />
        )}
        {type === "success" && (
          <img src={successIcon} alt="Success" className={styles.icon} />
        )}
        
        <span className={styles.message}>{message}</span>
        {buttonText && (<div className={styles.buttonContainer}><button className={styles.actionButton} onClick={onAction}>{buttonText}</button></div>)}
        
        <div className={styles.seperator}></div>
        <button className={styles.close} onClick={onClose}>×</button>
        </div>
      </div>
    );
  }
  
  export default Toast;