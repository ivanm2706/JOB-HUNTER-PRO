import styles from './Icon.module.css';

export default function Icon() {
  return (
    <div className="overflow-hidden" style={{ width: 150, height: 100 }}>
      <img className={styles.img} src="../../images/icon.png" alt="icon" />
    </div>
  );
}
