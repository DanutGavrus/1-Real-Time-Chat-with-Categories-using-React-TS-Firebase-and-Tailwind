import { Outlet } from "react-router-dom"

export default function RootLayout({ displayName }) {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--color-text)] py-10 font-serif">
      <header className="flex justify-center pb-10 text-3xl ">
        {!displayName && "👋 Hi, please sign in with Google to use this live-chat! 👋"}
        {displayName && `👋 Hi, ${displayName.split(" ")[0]}! 👋`}
      </header>

      <Outlet />
    </div>
  );
}