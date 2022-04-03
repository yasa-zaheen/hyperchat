// React
import { useEffect, useState } from "react";

// Next
import { useTheme } from "next-themes";

// Firebase
import { auth } from "../firebase";

// Heroicons
import {
  UsersIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";
import IconButton from "./IconButton";

function Header({ activityBarHidden, setActivityBarHidden }) {
  // States
  const [mounted, setMounted] = useState(false);

  // Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  // Others
  const { systemTheme, theme, setTheme } = useTheme();
  const buttonClass =
    "absolute left-16 md:left-4 text-sm bg-neutral-100 dark:bg-[#1c1c1e] text-black dark:text-white";

  // Functions
  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
    return (
      <IconButton
        Icon={currentTheme === "light" ? MoonIcon : SunIcon}
        className={buttonClass}
        onClick={() => {
          currentTheme === "light" ? setTheme("dark") : setTheme("light");
        }}
      />
    );
  };

  const showActivityBar = () => {
    activityBarHidden
      ? setActivityBarHidden(false)
      : setActivityBarHidden(true);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="relative h-fit w-full bg-white dark:bg-[#2c2c2e] flex justify-center items-center p-4 rounded-xl overflow-hidden">
      {/* Activity Bar Btn */}
      <IconButton
        Icon={UsersIcon}
        onClick={showActivityBar}
        className="md:hidden absolute left-4 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
      />

      {/* Theme Changer */}
      {renderThemeChanger()}

      <p className="text-2xl font-semibold">hyperchat.</p>

      {/* Logout Button */}
      <IconButton
        Icon={LogoutIcon}
        onClick={signOut}
        className="absolute right-4 bg-[#007aff] dark:bg-[#ff2d55] text-white"
      />
    </div>
  );
}

export default Header;
