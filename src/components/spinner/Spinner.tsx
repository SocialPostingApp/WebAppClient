import React from 'react';
import './spinner.css';

interface IProps {}

const Spinner: React.FC<IProps> = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
