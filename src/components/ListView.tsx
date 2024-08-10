import React, { useEffect, useState } from "react";
import Celebrity from "./Celebrity";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export type CelebrityProp = {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
};

const ListView = () => {
  const [celebrities, setCelebrities] = useState<CelebrityProp[]>();
  const [filteredCelebrities, setFilteredCelebrities] =
    React.useState<CelebrityProp[]>();
  const [search, setSearch] = useState<string>("");
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    fetch("/celebrities.json")
      .then((response) => response.json())
      .then((jsonData) => setCelebrities(jsonData))
      .catch((error) => console.log("Error: " + error));
  }, []);

  useEffect(() => {
    setFilteredCelebrities(
      celebrities?.filter((celebritie) =>
        `${celebritie.first} ${celebritie.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, celebrities]);

  const handleAccordionChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      console.log("event" + event);
    };

  const deleteUser = (id: number) => {
    celebrities &&
      setCelebrities(celebrities.filter((celebritie) => celebritie.id !== id));
  };

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: "bold",
            textAlign: "start",
            marginBottom: "20px",
          }}
        >
          List View
        </Typography>
      </Box>

      {/* Search bar */}
      <Box sx={{ marginBottom: "30px" }}>
        <TextField
          sx={{
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
          name="first"
          fullWidth
          value={search}
          placeholder="Search users"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredCelebrities &&
        filteredCelebrities.map((celebrity) => (
          <Celebrity
            key={celebrity.id}
            celebrity={celebrity}
            deleteUser={deleteUser}
            expanded={expanded}
            onChange={handleAccordionChange}
            panel={`panel${celebrity.id}`}
          />
        ))}
    </>
  );
};

export default ListView;
