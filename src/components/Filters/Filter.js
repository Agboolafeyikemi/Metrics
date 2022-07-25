import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = (props) =>
  createTheme({
    overrides: {
      MuiFormControl: {
        marginNormal: {
          marginTop: 8,
          marginBottom: 0,
        },
        root: {
          width: "100%",
        },
      },
      MuiInput: {
        underline: {
          "&&&&:after": {
            borderBottom: "1px solid white",
          },
        },
      },
      MuiInputLabel: {
        root: {
          color: "white",
          "&$focused": {
            color: props.theme === "graph" ? "black" : "white",
          },
        },
        formControl: {
          color: props.theme === "graph" ? "black" : "white",
        },
      },
      MuiInputBase: {
        input: {
          color: props.theme === "graph" ? "black" : "white",
          "&:disabled": {
            color: props.theme === "graph" ? "black" : "white",
          },
        },
        root: {
          color: props.theme === "graph" ? "black" : "white",
        },
      },
      MuiFormHelperText: {
        root: {
          height: "10px",
          fontFamily: "Helvetica",
          fontSize: "10px",
          lineHeight: "10px",
          color: "white",
        },
      },
      MuiSelect: {
        icon: {
          color: props.theme === "graph" ? "black" : "white",
        },
      },
    },
  });
const useStyles = makeStyles((Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },

    input: {
      color: "white",
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
  })
);

export const Filter = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    sortBy: props.default || null,
  });

  const handleChange = (name) => (event) => {
    setState({ [name]: event.target.value });
    props.onApply(event.target.value);
  };

  return (
    <MuiThemeProvider theme={theme(props)}>
      <FormControl>
        {props.label && <InputLabel htmlFor="sortBy">Sort By</InputLabel>}
        <Select
          className={classes.input}
          value={state.sortBy || ""}
          onChange={handleChange("sortBy")}
          input={<Input id="sortBy" />}
        >
          {props.none && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          {props.sortByOptions.map((sort) => {
            return (
              <MenuItem value={sort.id} key={sort.id}>
                {sort.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </MuiThemeProvider>
  );
};
