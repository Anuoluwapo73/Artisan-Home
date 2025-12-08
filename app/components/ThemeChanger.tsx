"use client"

import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeChanger = () => {
  const [darkMode, setDarkMode] = useState(false);

  //Apply theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <div className="flex items-center bg-white dark:bg-gray-900 p-1 rounded-full transition-colors duration-500">
      <button onClick={toggleTheme}>
        {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </div>
  );
};

export default ThemeChanger;
