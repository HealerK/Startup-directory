import { Search } from "lucide-react";
import React from "react";
import SearchFormRest from "./SearchFormRest";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <form action="/" className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormRest />}
        <Button
          type="submit"
          className="search-btn text-white"
          aria-label="Search"
        >
          <Search className="size-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
