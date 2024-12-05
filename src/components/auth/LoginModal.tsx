import React, { useState } from 'react';
import { X } from 'lucide-react';
import RequestCode from './RequestCode';
import VerifyCode from './VerifyCode';
import styles from './LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.content}>
          <h2 className={styles.title}>
            {step === 'request' ? 'Sign In' : 'Verify Code'}
          </h2>
          
          {step === 'request' ? (
            <RequestCode 
              onCodeRequested={(phone) => {
                setPhoneNumber(phone);
                setStep('verify');
              }}
            />
          ) : (
            <VerifyCode 
              phoneNumber={phoneNumber}
              onVerificationSuccess={() => {
                onClose();
              }}
              onBack={() => setStep('request')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;