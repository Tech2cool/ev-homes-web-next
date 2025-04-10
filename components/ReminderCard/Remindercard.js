import React from 'react';
import styles from './remindercard.module.css';

const Remindercard = () => {
  return (
    <div className={styles.reminderCard}>
      <h3 className={styles.title}>Reminders</h3>
      <ul className={styles.reminderList}>
        <li>Meeting with the client at 3 PM</li>
        <li>Meeting with the client at 3 PM</li>
      </ul>
    </div>
  );
};

export default Remindercard;
