import React, { useState } from 'react';
import './Count.css';

function Count() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="count-container">
      <p className="count-value">Count: {count}</p>
      <button className="count-button" onClick={increment}>Increment</button>
      <button className="count-button" onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Count;
