import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { verifyCode } from '../../services/mockAuthService';
import styles from './AuthForms.module.css';

interface VerifyCodeProps {
  phoneNumber: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({
  phoneNumber,
  onVerificationSuccess,
  onBack,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      await verifyCode(phoneNumber, verificationCode);
      onVerificationSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <button type="button" onClick={onBack} className={styles.backButton}>
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <p className={styles.info}>
        Enter the verification code sent to {phoneNumber}
      </p>

      <div className={styles.inputGroup}>
        <label htmlFor="code" className={styles.label}>
          Verification Code
        </label>
        <input
          type="text"
          id="code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter code"
          className={styles.input}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading || !verificationCode.trim()}
      >
        <CheckCircle size={18} />
        <span>{isLoading ? 'Verifying...' : 'Verify Code'}</span>
      </button>
    </form>
  );
};

export default VerifyCode;