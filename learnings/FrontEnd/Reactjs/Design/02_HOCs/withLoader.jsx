import React from "react";

const withLoader = (WrappedComponent) => {
  return (props) => {
    if (!props.data) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withLoader;
