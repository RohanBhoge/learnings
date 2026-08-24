"use client";
import React, { Suspense } from "react";
import LoadingTest from "./components/LoadingTest";
import { ContentComponent } from "./components/ContentComponent";

// export async function generateMetadata() {
//   return {
//     title: "Test Page",
//     description: "This is a test page",
//   };
// }

const page = () => {
  return (
    <div>
      <h1>This is main page.</h1>
      <ContentComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingTest />
      </Suspense>
    </div>
  );
};

export default page;
