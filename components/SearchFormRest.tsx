"use client";
import { X } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const SearchFormRest = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formRef.current) formRef.current.reset();
  };
  return (
    <Button
      type="reset"
      onClick={handleReset}
      aria-label="Reset"
      className="search-btn text-white"
    >
      <Link href="/">
        <X className="size-4" />
      </Link>
    </Button>
  );
};

export default SearchFormRest;
