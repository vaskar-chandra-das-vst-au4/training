import { Link } from 'react-router-dom';
import style from './Submit.module.css';
import styles from '../pages/Home.module.css';
const Submit = () => {
  return (
    <div className={style.container}>
      <br />
      <h1>Product added successfully</h1>
      <br />
      <Link
        id={styles.anchor}
        className={`${styles.btn} ${styles.submit}`}
        to=".."
      >
        Go Back
      </Link>
    </div>
  );
};
export default Submit;
