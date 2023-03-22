const setTheme = () => {
  if (localStorage.isDarkTheme === "false") {
    document.documentElement.classList.remove("dark");
  }
  if (localStorage.isDarkTheme === "true") {
    document.documentElement.classList.add("dark");
  }
}

const setExplicitTheme = (isDarkTheme: boolean) => {
  localStorage.isDarkTheme = `${isDarkTheme}`;
  setTheme();
}

export { setTheme, setExplicitTheme };