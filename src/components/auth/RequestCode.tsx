import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { requestVerificationCode } from '../../services/mockAuthService';
import styles from './AuthForms.module.css';

interface RequestCodeProps {
  onCodeRequested: (phoneNumber: string) => void;
}

const RequestCode: React.FC<RequestCodeProps> = ({ onCodeRequested }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      await requestVerificationCode(phoneNumber);
      onCodeRequested(phoneNumber);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="(555) 555-5555"
          className={styles.input}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || !phoneNumber.trim()}
      >
        <Send size={18} />
        <span>{isLoading ? 'Sending...' : 'Send Code'}</span>
      </button>
    </form>
  );
};

export default RequestCode;