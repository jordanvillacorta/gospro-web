import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Stars } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link
            to="/home"
            className={`${styles.brand} ${location.pathname === '/home' ? styles.active : ''}`}
          >
            <Rocket className="h-8 w-8" style={{ color: '#39FF14' }} />
            <span className={styles.brandText}>STARBREW CREW</span>
          </Link>
          <div className={styles.actions}>
            <Link
              to="/favorites"
              className={`${styles.iconButton} ${location.pathname === '/favorites' ? styles.active : ''}`}
            >
              <Stars className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;