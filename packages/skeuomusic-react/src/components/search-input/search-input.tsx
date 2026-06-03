import { useRef } from "react";
import clearSearchIcon from "./icons/clear-search.svg";
import searchIcon from "./icons/search.svg";

type SearchInputProps = {
  onQueryChanged: (value: string) => void;
};

export default function SearchInput({ onQueryChanged }: SearchInputProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  function resetQuery() {
    searchInputRef.current!.value = "";
    onQueryChanged("");
  }

  return (
    <form className="search-container" onSubmit={(e) => e.preventDefault()} data-testid="search">
      <img
        src={searchIcon}
        className="search-icon"
        width="28px"
        height="28px"
        alt="Magnifying glass icon"
      />
      <input
        ref={searchInputRef}
        type="search"
        className="search-input"
        onInput={(e) => onQueryChanged(e.currentTarget.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <button
        type="reset"
        onClick={resetQuery}
        className="search-clear-button"
        aria-label="Clear search"
        data-testid="clearSearch"
      >
        <img src={clearSearchIcon} width="28px" height="28px" alt="Clear icon" />
      </button>
    </form>
  );
}
