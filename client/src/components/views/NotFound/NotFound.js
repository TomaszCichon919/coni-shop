import styles from './NotFound.module.scss'

const NotFound = () => (
      <div className={styles.wrapper}>
      <h3>404 Not Found</h3>
      <img className={styles.error} src='/images/logo/error.jpg' alt='error' />
      </div>
  );
  
  export default NotFound;


