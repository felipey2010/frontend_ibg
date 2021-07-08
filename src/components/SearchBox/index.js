import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    // marginRight: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    // marginRight: 8,
  },
  searchBox: {
    width: "100%",
    margin: 0,
    backgroundColor: "rgb(199, 199, 199)",
    // color: "rgb(48, 48, 48)",
    display: "flex",
    borderRadius: 10,
    border: "1px solid grey",
    padding: 3,
  },
  searchIcon: {
    cursor: "pointer",
    "&:hover": {
      color: "#c11c1c",
    },
  },
  searchTextField: {
    border: "none",
    outline: "none",
    padding: "0 5px 0 5px",
    marginLeft: 4,
    marginRight: 4,
    fontSize: 15,
  },
}));

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();

  const handleChange = e => {
    setSearchText(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.searchBox}>
          <input
            type="text"
            name=""
            value={searchText}
            onChange={handleChange}
            className={classes.searchTextField}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
      </div>
    </div>
  );
}
