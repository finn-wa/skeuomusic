import styles from "./slide-to-unlock.module.css";
import thumb from "./thumb.svg";

export default function SlideToUnlock() {
  return (
    <div className={styles.slider}>
      <div className={styles.wh100}>
        <div className={`${styles.track} ${styles.wh100}`} />
        <div className={`${styles.progress} ${styles.wh100}`} />
        <div className={styles.bounds}>
          <img className={styles.knob} src={thumb} height="40px" />
        </div>
      </div>
    </div>
  );
}
