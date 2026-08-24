// components/BootstrapClient.js
"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // Safely load Bootstrap JS only in the browser
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null; // This component doesn't render any UI
}
