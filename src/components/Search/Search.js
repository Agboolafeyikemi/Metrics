import React from "react";
import TextField from "@material-ui/core/TextField";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

export const Search = ({ onChange, searchName }) => {
  const theme = () =>
    createTheme({
      overrides: {
        MuiFormControl: {
          marginNormal: {
            marginTop: "0 !important",
            marginBottom: 0,
          },
          root: {
            width: "100%",
          },
        },

        MuiFormHelperText: {
          root: {
            width: "100%",
            height: "10px",
            color: "#595959",
            fontFamily: "Helvetica",
            fontSize: "10px",
            lineHeight: "10px",
          },
        },
        MuiInput: {
          underline: {
            "&:before": {
              //underline color when textfield is inactive
              borderBottom: "1px solid white",
            },
            "&:hover:not($disabled):before": {
              //underline color when hovered
              borderBottom: "1px solid white",
            },
          },
        },
      },
    });
  return (
    <MuiThemeProvider theme={theme()}>
      <TextField
        id="search"
        placeholder="Enter Name"
        label="Search By"
        value={searchName || ""}
        type={"text"}
        margin="normal"
        className="field"
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <i className="material-icons" onClick={onChange}>
                search
              </i>
            </InputAdornment>
          ),
        }}
      />
    </MuiThemeProvider>
  );
};
