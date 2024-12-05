import React from 'react';
import { Map, List } from 'lucide-react';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  view: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${view === 'list' ? styles.active : ''}`}
        onClick={() => onViewChange('list')}
      >
        <List size={20} />
        <span>List</span>
      </button>
      <button
        className={`${styles.button} ${view === 'map' ? styles.active : ''}`}
        onClick={() => onViewChange('map')}
      >
        <Map size={20} />
        <span>Map</span>
      </button>
    </div>
  );
};

export default ViewToggle;