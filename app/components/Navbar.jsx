"use client";

import { Search, Bell, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // apply dark class on body
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-sm border-b bg-white dark:bg-gray-900">

      {/* SEARCH */}
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-full max-w-md">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search doctors, records..."
          className="bg-transparent outline-none w-full text-sm text-black dark:text-white"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 ml-4">

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* NOTIFICATION */}
        <button
          onClick={() => alert("No new notifications")}
          className="p-2 rounded-lg hover:bg-gray-100 relative"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-xl">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-black dark:text-green">
            Dilkhush
          </span>
        </div>
      </div>
    </div>
  );
}