import { BarChart, MapPin, Repeat, CheckSquare, Clock } from "lucide-react";
import styles from "./leadcards.module.css";
import Link from "next/link";

const Leadcards = ({ leadInfo = null }) => {
  return (
    <div className={styles.container}>
      <Link href="/leads" className={styles.card}>
        <div className={styles.text}>
          <p>Leads</p>
          <h2>{leadInfo?.totalItems ?? 0}</h2>
        </div>
        <BarChart className={`${styles.icon} ${styles.blue}`} />
      </Link>
      <div className={styles.card}>
        <div className={styles.text}>
          <p>Visit 1</p>
          <h2>{leadInfo?.visitCount ?? 0}</h2>
        </div>
        <MapPin className={`${styles.icon} ${styles.orange}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <p>Visit 2</p>
          <h2>{leadInfo?.visit2Count ?? 0}</h2>
        </div>
        <Repeat className={`${styles.icon} ${styles.purple}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <p>Booking</p>
          <h2>{leadInfo?.bookingCount ?? 0}</h2>
        </div>
        <CheckSquare className={`${styles.icon} ${styles.green}`} />
      </div>
      <div className={styles.card}>
        <div className={styles.text}>
          <p>Pending</p>
          <h2>{leadInfo?.pendingCount ?? 0}</h2>
        </div>
        <Clock className={`${styles.icon} ${styles.red}`} />
      </div>
    </div>
  );
};

export default Leadcards;
