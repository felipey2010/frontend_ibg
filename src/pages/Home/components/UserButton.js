import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 10,
    marginTop: theme.spacing(4),
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "1.18rem",
    textTransform: "capitalize",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "#c11c1c",
    display: "flex",
  },
  button: {
    marginRight: 8,
    color: "#c11c1c",
  },
}));

export default function Profile({ user }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();

    closeSnackbar();

    localStorage.clear();

    axios
      .post("user/auth/logout/" + user.id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Logout Successful", { variant: "success" });
          window.location.reload(true);
        } else {
          enqueueSnackbar("Erro de Logout", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className={classes.container}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <Button>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Olá, {user.nome_usuario}
          </Typography>
        </Button>
        <ArrowDropDownIcon />
      </div>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        className={classes.menuButton}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <Link to="/home/perfil" className={classes.link}>
          <MenuItem onClick={handleClose}>
            <PersonIcon className={classes.button} />
            Perfil
          </MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>
          <Link to="/" className={classes.link}>
            <ExitToAppIcon className={classes.button} />
            Sair
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
