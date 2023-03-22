import { useState } from "react";
import { Outlet } from "react-router-dom";
import { setExplicitTheme } from "../scripts/theme";

export default function RootLayout(context: LiveChatContext) {
  const [isChecked, setIsChecked] = useState(
    localStorage.isDarkTheme === "true" ? true : false
  );

  const handleThemeToggleClick = (isDarkTheme: boolean) => {
    setIsChecked(isDarkTheme);
    setExplicitTheme(isDarkTheme);
  }

  return (
    <div className="flex flex-col py-10 min-h-screen bg-primary text-text font-serif">
      <label className="relative inline-flex mx-auto mb-1 items-center cursor-pointer">
        <input type="checkbox" checked={isChecked}
          onChange={(e) => handleThemeToggleClick((e.target as HTMLInputElement).checked)}
          className="hidden peer" />
        <div className="w-11 h-6 rounded-full bg-secondary after:absolute after:h-5 after:w-5 after:transition-all after:top-[2px] after:left-[2px] after:rounded-full after:bg-white dark:after:bg-primary after:border after:border-secondary peer-checked:after:translate-x-full" />
        <p className="ml-1 text-xs"><span>Dark mode</span></p>
      </label>

      <Outlet context={context} />
    </div>
  );
}