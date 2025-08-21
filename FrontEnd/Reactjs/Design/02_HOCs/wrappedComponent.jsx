import React, { useState } from "react";

const WrappedComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Wrapped Component</h1>
      <div className="count" onClick={() => setCount(count + 1)}>
        {count}
      </div>
    </div>
  );
};

export default WrappedComponent;
