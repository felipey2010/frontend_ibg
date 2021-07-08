import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SearchBox from "../../../../components/SearchBox";
import Divider from "@material-ui/core/Divider";
import AddDrawer from "./components/AddButton.js";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: "100%",
    width: "100%",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  rightContainer: {
    position: "absolute",
    right: 0,
    display: "flex",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#c11c1c",
    color: "white",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#5d0202",
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  menuContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
  },
  divider: {
    marginTop: 20,
    marginBottom: 15,
  },
  bottomContainer: {
    // marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: "#c1c1c13d",
    height: "70vh",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function ReportPage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <div className={classes.menuContainer}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Relatórios
          </Typography>
          <SearchBox />
          <Button
            variant="contained"
            color="#c11c1c"
            className={classes.button}
            onClick={handleDrawerOpen}
            startIcon={<AddIcon />}>
            Novo Relatório
          </Button>
        </div>
        {/* <Divider variant="middle" className={classes.divider} /> */}
        {/* <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </TableContainer>
      <div className={classes.bottomContainer}></div>
      <AddDrawer open={open} setOpen={setOpen} />
    </React.Fragment>
  );
}
