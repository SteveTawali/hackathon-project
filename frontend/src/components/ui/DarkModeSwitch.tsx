import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDark(true);
    if (savedTheme === "light") setIsDark(false);
  }, []);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted transition-colors"
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeSwitch;
