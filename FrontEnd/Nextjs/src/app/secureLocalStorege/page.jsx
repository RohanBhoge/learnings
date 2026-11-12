"use client";

import React from "react";

import secureLocalStorage from "react-secure-storage";

const page = () => {
  localStorage.setItem("test", "test");
  secureLocalStorage.setItem("test", "test");

  console.log("localStorage", localStorage.getItem("test"));
  console.log("secureLocalStorage", secureLocalStorage.getItem("test"));
  return <div>page</div>;
};

export default page;