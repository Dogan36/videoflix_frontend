import { useState } from 'react';
import styles from './ResolutionDropdown.module.css';

export default function ResolutionDropdown({ availableResolutions, currentResolution, onResolutionChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (res) => {
    onResolutionChange(res);
    // hier NICHT schließen, wenn es offen bleiben soll
    // setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentResolution}p ▼
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {availableResolutions.map((res) => (
            <li
              key={res}
              className={styles.dropdownItem}
              onClick={() => handleSelect(res)}
            >
              {res}p
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
