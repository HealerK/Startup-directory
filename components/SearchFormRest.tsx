"use client";
import { X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const SearchFormRest = () => {
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.querySelector(".search-input") as HTMLFormElement;
    if (form) form.reset;
  };
  return (
    <Button type="reset" onClick={handleReset} aria-label="Reset" className="search-btn text-white">
      <Link href="/" >
        <X className="size-4" />
      </Link>
    </Button>
  );
};

export default SearchFormRest;
