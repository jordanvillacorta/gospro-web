import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, User, Heart, LogOut } from 'lucide-react';
import LoginModal from './auth/LoginModal';
import { logout } from '../services/mockAuthService';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link to="/" className={styles.brand}>
            <Rocket className="h-8 w-8" style={{ color: '#39FF14' }} />
            <span className={styles.brandText}>STARBREW CREW</span>
          </Link>
          <div className={styles.actions}>
            <Link 
              to="/favorites" 
              className={`${styles.iconButton} ${location.pathname === '/favorites' ? styles.active : ''}`}
            >
              <Heart className="h-6 w-6" />
            </Link>
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className={styles.iconButton}
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className={styles.iconButton}
              >
                <User className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;