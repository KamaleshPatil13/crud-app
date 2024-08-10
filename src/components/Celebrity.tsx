import { CelebrityProp } from "./ListView";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import * as React from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Delete from "./Delete";

type CelebrityProps = {
  celebrity: CelebrityProp;
  deleteUser: (id: number) => void;
  expanded: string | false;
  onChange: (
    panel: string
  ) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  panel: string;
};

const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "Transgender",
    label: "Transgender",
  },
  {
    value: "rather not say",
    label: "Rather-not-say",
  },
  {
    value: "other",
    label: "Other",
  },
];

const Celebrity: React.FC<CelebrityProps> = ({
  celebrity,
  deleteUser,
  expanded,
  onChange,
  panel,
}) => {
  const [data, setData] = React.useState(celebrity);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [deletDialog, setDeletDialog] = React.useState<boolean>(false);

  let username = `${data.first} ${""} ${data.last}`;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSubmit = () => {
    setEditing(false);
  };

  const handleDeleteDialog = () => {
    setDeletDialog(true);
  };

  const calculateYearsFromDate = (inputDate: string) => {
    const today = new Date();
    const pastDate = new Date(inputDate);
    const yearsDifference = today.getFullYear() - pastDate.getFullYear();
    return yearsDifference;
  };

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Accordion
        expanded={expanded === panel}
        onChange={onChange(panel)}
        sx={{
          "& .css-1086bdv-MuiPaper-root-MuiAccordion-root": {
            boxShadow: "none",
          },
        }}
      >
        {/* usericon and username */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                alignContent: "center",
                border: "1px solid gray",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                marginTop: "10px",
              }}
            >
              <FaUserAlt style={{ height: "20px", width: "20px" }} />
            </Box>
            <Box sx={{ paddingLeft: "20px" }}>
              {!editing ? (
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                  {username}
                </Typography>
              ) : (
                <>
                  <TextField
                    name="first"
                    multiline
                    value={data.first}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        width: `${data.first.length + 1}ch`, // Adjust width based on the content
                      },
                    }}
                  />
                  <TextField
                    name="last"
                    value={data.last}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiInputBase-input": {
                        width: `${data.last.length + 1}ch`, // Adjust width based on the content
                      },
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        </AccordionSummary>

        {/* userdetails */}
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={{ display: "grid", justifyContent: "center" }}>
              <Typography
                sx={{ textAlign: { xs: "center", sm: "start" }, color: "gray" }}
              >
                Age
              </Typography>
              {!editing ? (
                <Typography
                  sx={{ whiteSpace: "pre-line", textAlign: "center" }}
                >
                  {`${calculateYearsFromDate(data.dob)} years`}
                </Typography>
              ) : (
                <TextField
                  name="dob"
                  multiline
                  value={data.dob}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      width: `${data.dob.length + 1}ch`, // Adjust width based on the content
                    },
                  }}
                />
              )}
            </Box>
            <Box>
              <Typography
                sx={{ textAlign: { xs: "center", sm: "start" }, color: "gray" }}
              >
                Gender
              </Typography>
              {!editing ? (
                <Typography
                  sx={{ whiteSpace: "pre-line", textAlign: { sm: "justify" } }}
                >
                  {data.gender}
                </Typography>
              ) : (
                <TextField
                  name="gender"
                  select
                  value={data.gender}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      width: `${data.gender.length + 1}ch`,
                    },
                  }}
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
            <Box>
              <Typography
                sx={{ textAlign: { xs: "center", sm: "start" }, color: "gray" }}
              >
                Country
              </Typography>
              {!editing ? (
                <Typography
                  sx={{ whiteSpace: "pre-line", textAlign: { sm: "justify" } }}
                >
                  {data.country}
                </Typography>
              ) : (
                <TextField
                  name="country"
                  multiline
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={data.country}
                  onChange={handleInputChange}
                  sx={{
                    "& .MuiInputBase-input": {
                      width: `${data.country.length + 1}ch`, // Adjust width based on the content
                    },
                  }}
                />
              )}
            </Box>
          </Box>
          <Box display="grid" sx={{ paddingTop: 2 }}>
            <Typography
              sx={{ textAlign: { xs: "center", sm: "start" }, color: "gray" }}
            >
              Description
            </Typography>
            {!editing ? (
              <Typography sx={{ whiteSpace: "pre-line", textAlign: "justify" }}>
                {data.description}
              </Typography>
            ) : (
              <TextField
                name="description"
                multiline
                value={data.description}
                onChange={handleInputChange}
                sx={{
                  "& .MuiInputBase-input": {
                    width: `${data.description.length + 1}ch`, // Adjust width based on the content
                  },
                }}
              />
            )}
          </Box>
        </AccordionDetails>

        {/* actions buttons */}
        <AccordionActions>
          {!editing ? (
            <Box>
              <Button>
                <AiTwotoneDelete
                  onClick={handleDeleteDialog}
                  style={{ color: "red", height: "25px", width: "25px" }}
                />
              </Button>
              {calculateYearsFromDate(data.dob) > 18 && (
                <Button onClick={handleEdit}>
                  <MdOutlineModeEdit
                    style={{ color: "blue", height: "25px", width: "25px" }}
                  />
                </Button>
              )}
            </Box>
          ) : (
            <Box>
              <Button>
                <MdOutlineCancel
                  onClick={handleCancel}
                  style={{ color: "red", height: "25px", width: "25px" }}
                />
              </Button>
              <Button onClick={handleSubmit}>
                <IoCheckmarkDoneCircleOutline
                  style={{ color: "blue", height: "25px", width: "25px" }}
                />
              </Button>
            </Box>
          )}
        </AccordionActions>
      </Accordion>

      <Delete
        open={deletDialog}
        setOpen={setDeletDialog}
        id={data.id}
        deleteUser={deleteUser}
      />
    </Box>
  );
};

export default Celebrity;
