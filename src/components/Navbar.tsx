import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, User, Heart } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.brand}>
            <Coffee className="h-8 w-8" style={{ color: '#623b35' }} />
            <span className={styles.brandText}>STARBREW CREW</span>
          </Link>
          <div className={styles.actions}>
            <button className={styles.iconButton}>
              <Heart className="h-6 w-6" />
            </button>
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