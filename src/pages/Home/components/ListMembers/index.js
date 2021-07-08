import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SearchBox from "../../../../components/SearchBox";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import AddMemberModal from "./components/AddMember.js";
import MemberCard from "./components/memberCard.js";

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
    minWidth: 100,
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
  mainContainer: {
    height: "100%",
  },
  bottomContainer: {
    // marginTop: theme.spacing(2),
    width: "100%",
    backgroundColor: "#c1c1c13d",
    height: "70vh",
    overflowY: "auto",
    padding: 0,
  },
}));

export default function ListMembers({ members, setMembers }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  async function getMembers() {
    axios
      .get("/membros")
      .then(res => {
        setMembers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // useEffect(() => {
  //   getMembers();
  // }, []);

  return (
    <React.Fragment>
      <TableContainer className={classes.mainContainer} component={Paper}>
        <div className={classes.menuContainer}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Membros
          </Typography>
          <SearchBox />
          <Button
            variant="contained"
            color="#c11c1c"
            className={classes.button}
            onClick={handleDrawerOpen}
            startIcon={<AddIcon />}>
            Novo Membro
          </Button>
        </div>
        {/* <Divider variant="middle" className={classes.divider} /> */}
      </TableContainer>
      <div className={classes.bottomContainer}>
        <MemberCard members={members} getMembers={getMembers} />
      </div>
      <AddMemberModal open={open} setOpen={setOpen} getMembers={getMembers} />
    </React.Fragment>
  );
}
