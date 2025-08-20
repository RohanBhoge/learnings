import React from "react";

const wrappedComponent = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>Wrapped Component</h1>
      <div className="count" onClick={() => setCount(count + 1)}>
        {count}
      </div>
    </div>
  );
};

export default wrappedComponent;
