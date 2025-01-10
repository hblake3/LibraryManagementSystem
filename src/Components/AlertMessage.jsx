import React, { useEffect, useState } from 'react';

const AlertMessage = ({ message, duration = 3000, type }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300); // Start exit animation 300ms before removal

    const removeTimer = setTimeout(() => {
      // Component will be unmounted by parent
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  return (
    <div className={`alert-container ${isExiting ? 'alert-exit' : ''}`}>
      <div className={`alert alert-${type}`}>{message}</div>
    </div>
  );
};

export default AlertMessage;
