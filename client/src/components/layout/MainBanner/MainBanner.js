import {React, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import styles from './MainBanner.module.scss'
import { memoizedGetAll } from '../../../redux/cartRedux'

const MainBanner = () => {


  const cart = useSelector(memoizedGetAll);
 
console.log('cart', cart)
  return (
    <div>
    <div className={styles.root}>
      <div className='container'>
        <div className='row align-items-center'>
        <div className='col text-center'>
            <a href='/'>
              <img className={styles.logo} src='/images/logo/logo.jpg' alt='coni-logo' />
            </a>
          </div>
          <div className={`col text-left ${styles.phoneNumber}`}>
            <p>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} /> +48 666 200 700
            </p>
          </div>
          <div className={`col text-right ${styles.cart}`}>
            <Link to='/cart' className={styles.cartBox}>
              <div className={styles.cartIcon}>
                <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
              </div>
              {cart.length > 0 && (
                  <div className={styles.cartCounter}>{cart.length}</div>
                )}
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MainBanner;