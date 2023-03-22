import { useState } from "react";

type Props = {
  placeholder: string,
  onSearchTextChanged: Function
};

export default function SearchBar({ placeholder, onSearchTextChanged }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const updateSearchText = (searchText: string) => {
    onSearchTextChanged(searchText);
    setSearchValue(searchText);
  }

  const clearSearchText = () => {
    onSearchTextChanged("");
    setSearchValue("");
  }

  return (
    <>
      <input value={searchValue} type="text" maxLength={20}
        onChange={(e) => updateSearchText(e.target.value)}
        placeholder={placeholder} className="rounded-xl mx-3 mt-6 pl-3 pr-5 py-1 border border-transparent focus:outline-none focus:border-accent dark:bg-black" />
      {searchValue &&
        <button onClick={clearSearchText} className="h-3 w-3 absolute top-6 right-5">✗</button>
      }
    </>
  );
}
