import React, { useState } from "react";
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
import axios from "axios";
import { useSnackbar } from "notistack";

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
    backgroundColor: "#ce2929",
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
  button: {
    color: "#c11c1c",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.1s",
    },
  },
}));

export default function DeleteDialog({ member, getMembers }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  async function Delete() {
    closeSnackbar();
    axios
      .delete("/membros/" + member._id)
      .then(res => {
        if (res.data.success) {
          getMembers();
          enqueueSnackbar("Membro Excluído", { variant: "success" });
        } else {
          enqueueSnackbar("Exclusão Sem Sucesso", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Falhar de Excluir", { variant: "error" });
        console.log(error);
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    handleClose();
    Delete();
  };

  const handleNo = () => {
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        size="small"
        color="primary"
        className={classes.button}>
        Deletar
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" className={classes.title}>
          {"Excluir"}
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
              Deseja realmente excluir {member.nome_completo}?
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
