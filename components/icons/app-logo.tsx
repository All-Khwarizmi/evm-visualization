import React from "react";

function AppLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-purple-500"
    >
      <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
      <path d="M8 8H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
      <path d="M19 8h-3a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
      <path d="M12 12v4" />
    </svg>
  );
}

export default AppLogo;
