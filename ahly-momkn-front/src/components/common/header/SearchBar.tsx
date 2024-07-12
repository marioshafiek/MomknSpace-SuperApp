// components/header/SearchBar.tsx
import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useSearch } from "../../../SearchContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <InputGroup width="700px">
      <InputLeftElement pointerEvents="none">
        <CiSearch />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search anything here"
        focusBorderColor="#06B47933"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
