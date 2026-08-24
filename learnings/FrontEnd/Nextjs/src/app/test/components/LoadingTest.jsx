import React from "react";

const fetchDataComponent = async () => {
  await fetch("https://procodrr.vercel.app/?sleep=5000").catch((err) => {
    console.error("Error fetching data:", err);
  });
  return <div>Component Loaded Successfully.</div>;
};

const LoadingTest = () => {
  return (
    <div>
      {fetchDataComponent()}
      <p>Loading Test Component.</p>
    </div>
  );
};

export default LoadingTest;
