import { Link } from 'react-router-dom';
import styles from './Submit.module.css';

const Submit = () => {
  return (
    <div className={styles.container}>
      <h1>Data posted successfully</h1>
      <br />
      <Link to="..">Go Back</Link>
    </div>
  );
};
export default Submit;
