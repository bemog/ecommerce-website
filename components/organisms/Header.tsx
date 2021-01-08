import { FC, useContext } from 'react';
import {
  faLock, faLockOpen, faShoppingCart, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import { UserContext } from 'context/UserContext'

import Nav from 'components/atoms/Nav';
import Search from 'components/atoms/Search';
import styles from './Header.module.scss';

const Header:FC = () => {
  const { user } = useContext(UserContext)

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.topCol}>
          <img className={styles.logo} src="/gopro-logo-300.png" alt="gopro logo" />
        </div>
        <div className={styles.topCol}>
          <Search />
        </div>
        <div className={`${styles.topCol} ${styles.topColCart}`}>
          <Link href="/cart">
            <a>
              <div className={styles.cart}>
                <FontAwesomeIcon icon={faShoppingCart} />
                My Cart
                <div className={styles.itemsNum}>{user.cart.length}</div>
              </div>
            </a>
          </Link>
        </div>
      </div>
      {user.authenticated ? (
        <div className={styles.user}>
          <div className={styles.userName}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user.userName}</p>
          </div>
          <button type="button">
            <a>
              <FontAwesomeIcon icon={faLock} />
              <p>Log Out</p>
            </a>
          </button>
        </div>
      ) : (
        <div className={styles.user}>
          <button type="button">
            <Link href="/sign-in">
              <a>
                <FontAwesomeIcon icon={faUser} />
                <p>Sign In</p>
              </a>
            </Link>
          </button>
          <button type="button">
            <Link href="/log-in">
              <a>
                <FontAwesomeIcon icon={faLockOpen} />
                <p>Log In</p>
              </a>
            </Link>
          </button>
        </div>
      )}
      <Nav />
    </div>
  );
}

export default Header;
