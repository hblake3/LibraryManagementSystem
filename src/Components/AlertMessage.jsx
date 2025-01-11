import React, { useEffect, useState } from 'react';

const AlertMessage = ({ message, duration = 3000, type }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation before the alert is removed
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    // Remove the alert after duration
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Cleanup timers if component unmounts
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div className={`alert-container ${isExiting ? 'alert-exit' : ''}`}>
      <div className={`alert alert-${type}`}>{message}</div>
    </div>
  );
};

export default AlertMessage;
