import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>Analyzing market opportunities...</p>
        </div>
    );
};

export default LoadingSpinner;
