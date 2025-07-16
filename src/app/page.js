"use client";

import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("@/app/App"), { ssr: false });

export default function Home() {
  return (
    <div>
      <App />
    </div>
  );
}