import { BarChart, MapPin, Repeat, CheckSquare, Clock } from "lucide-react";
import styles from "./leadcards.module.css";
import Link from "next/link";

const Leadcards = () => {
  return (
    <div className={styles.container}>
      <Link href="/leads" className={styles.card}>
        <div className={styles.text}>
          <h4>Leads</h4>
          <h2 >16689</h2>
        </div>
        <BarChart className={`${styles.icon} ${styles.blue}`} />
      </Link>
      <div className={styles.card}>
        <div className={styles.text}>
          <h4>Visit 1</h4>
          <h2>148</h2>
        </div>
        <MapPin className={`${styles.icon} ${styles.orange}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <h4>Visit 2</h4>
          <h2>40</h2>
        </div>
        <Repeat className={`${styles.icon} ${styles.purple}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <h4 >Booking</h4>
          <h2 >136373</h2>
        </div>
        <CheckSquare className={`${styles.icon} ${styles.green}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <h4>Pending</h4>
          <h2 >136373</h2>
        </div>
        <Clock className={`${styles.icon} ${styles.red}` } />

      </div>
    </div>
  );
};

export default Leadcards;
