import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, User, Heart } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.brand}>
            <Coffee className="h-8 w-8" style={{ color: '#623b35' }} />
            <span className={styles.brandText}>STARBREW CREW</span>
          </Link>
          <div className={styles.actions}>
            <Link
              to="/favorites"
              className={`${styles.iconButton} ${location.pathname === '/favorites' ? styles.active : ''}`}
            >
              <Heart className="h-6 w-6" />
            </Link>
            <button className={styles.iconButton}>
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;