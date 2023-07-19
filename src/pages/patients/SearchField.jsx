import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const SearchInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
  },
});

const SearchField = ({ patients, setSearchResults }) => {
  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setSearchResults(patients);
    }

    const resultsArray = patients.filter(
      (patient) =>
        patient.identityNumber.toLowerCase().includes(e.target.value) ||
        patient.name.toLowerCase().includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  return (
    <SearchInput
      label="Serach for patient by identity number or name"
      style={{ width: "30vw" }}
      className="searchField"
      onChange={handleSearchChange}
    />
  );
};

export default SearchField;
