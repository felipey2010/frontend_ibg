import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: purple[500],
//     },
//     secondary: {
//       main: "#f44336",
//     },
//   },
// });

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: 20,
    marginBottom: 15,
  },
  title: {
    backgroundColor: "#c11c1c",
    color: "#fffefe",
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
  },
  buttonNo: {
    color: "black",
  },
  buttonYes: {
    color: "#f70000",
  },
}));

export default function DeleteDialog({
  open,
  setOpen,
  DeleteAccount,
  username,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    handleClose();
    DeleteAccount();
  };

  const handleNo = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {"Excluir Conta"}
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <DialogContentText>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.text}>
              {username}, deseja realmente excluir sua conta?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNo} className={classes.buttonNo}>
            Não
          </Button>
          <Button onClick={handleYes} autoFocus className={classes.buttonYes}>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
