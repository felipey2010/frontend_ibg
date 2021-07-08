import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";

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
    padding: theme.spacing(2),
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

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
// ];

export default function NotificationPage() {
  const classes = useStyles();

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
            Notificação
          </Typography>
        </div>
        {/* <Divider variant="middle" className={classes.divider} /> */}
      </TableContainer>
      <div className={classes.bottomContainer}></div>
    </React.Fragment>
  );
}
