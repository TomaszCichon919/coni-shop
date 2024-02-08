import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { memoizedGetAll } from '../../../redux/cartRedux';
import styles from './MainBanner.module.scss';

const MainBanner = () => {
  const cart = useSelector(memoizedGetAll);

  return (
    <Navbar expand="md" className={styles.root}>
      <Container>
        <Navbar.Brand href="/">
          <img className={styles.logo} src="/images/logo/logo.jpg" alt="coni-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className={`${styles.navbar_collapse} justify-content-between`} id="basic-navbar-nav">
          <Nav className={styles.phoneNumber}>
            <Nav.Link>
              <FontAwesomeIcon className={styles.icon} icon={faMobileAlt} />
              <span>+48 666 200 700</span> 
              </Nav.Link>
          </Nav>
          <Nav><p className={styles.slogan}>Shop online to get your products faster!</p></Nav>
          <Nav className={styles.cart}>
            <Nav.Link as={Link} to="/cart" className={styles.cartBox}>
              <div className={styles.cartIcon}>
                <FontAwesomeIcon className={styles.icon} icon={faShoppingBasket} />
                {cart.length > 0 && <div className={styles.cartCounter}>{cart.length}</div>}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
    };

export default MainBanner;