import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import DeleteDialog from "./components/deleteDialog";
import EmailDialog from "./components/emailDialog";
import { useSnackbar } from "notistack";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: "100%",
    width: "100%",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  mainContainer: {
    position: "relative",
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
  textField: {
    fontWeight: 500,
    fontSize: 16,
  },
  textContainer: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    width: "auto",
    position: "absolute",
    top: 7,
    right: theme.spacing(3),
  },
  editButton: {
    position: "absolute",
    right: 0,
    paddingRight: theme.spacing(2),
  },
  deleteContainer: {
    paddingLeft: theme.spacing(2),
  },
  passwordText: {
    paddingRight: theme.spacing(5),
  },
  resetButton: {
    position: "absolute",
    top: 0,
    right: theme.spacing(3),
  },
}));

export default function ProfilePage({ user }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let location = useLocation();
  const [saveButton, setSaveButton] = useState(true);
  const [openPassword, setOpenPassword] = useState(false);
  const [disableButton, setDisabledButton] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secondPasswordVisible, setSecondPasswordVisible] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  //For future comparison
  let oldEmail = user.email;

  const [values, setValues] = useState({
    nome_completo: user.nome_completo,
    nome_usuario: user.nome_usuario,
    email: user.email,
    senha: "",
    confirmarSenha: "",
  });

  const [textStates, setTextStates] = useState({
    nome_completo: true,
    nome_usuario: true,
    email: true,
    senha: true,
    confirmarSenha: true,
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });

    //Test for password validity
    if (evt.target.name === "senha" || evt.target.name === "confirmarSenha") {
      let password = values.senha;
      let otherPassword = values.confirmarSenha;

      if (password !== "") {
        if (password.length > 6) {
          setTextStates({
            ...textStates,
            confirmarSenha: false,
          });
          if (otherPassword.length === password.length - 1) {
            setDisabledButton(false);
          }
        } else {
          setTextStates({
            ...textStates,
            confirmarSenha: true,
          });
        }
      }
    }
  };

  function handleFieldClick(str) {
    if (str === 1) {
      setSaveButton(false);
      setTextStates({
        ...textStates,
        nome_completo: !textStates.nome_completo,
      });
    } else if (str === 2) {
      setSaveButton(false);
      setTextStates({
        ...textStates,
        nome_usuario: !textStates.nome_usuario,
      });
    } else if (str === 3) {
      setSaveButton(false);
      setTextStates({
        ...textStates,
        email: !textStates.email,
      });
    } else {
      setSaveButton(true);
    }
  }

  const disableFields = () => {
    setTextStates({
      ...textStates,
      nome_completo: true,
      nome_usuario: true,
      email: true,
    });
  };

  async function saveData() {
    let data = {
      nome_completo: values.nome_completo,
      nome_usuario: values.nome_usuario,
      email: values.email,
      senha: "",
    };
    axios
      .put("user/" + user.id, data)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Perfil Atualizado", { variant: "success" });
          setSaveButton(true);
          disableFields();
        } else {
          enqueueSnackbar("Erro em Salvar Dados", { variant: "error" });
          setSaveButton(false);
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em Atualizar", { variant: "error" });
        console.log(error);
        setSaveButton(false);
      });
  }

  function handleSave() {
    if (
      values.nome_completo !== "" &&
      values.nome_usuario !== "" &&
      values.email !== ""
    ) {
      if (values.email !== oldEmail) {
        setOpenEmailDialog(true);
      } else {
        saveData();
      }
    }
  }

  const DeleteAccount = () => {
    closeSnackbar();

    localStorage.clear();

    axios
      .delete("user/" + user.id)
      .then(result => {
        if (result.data.success) {
          enqueueSnackbar("Conta Excluída", { variant: "success" });
          window.location.reload(true);
        } else {
          enqueueSnackbar("Erro em Excluir Conta", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha de Exclusão", { variant: "error" });
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    if (user) {
      let userName = user.nome_completo;
      userName = userName.split(" ");
      setUsername(userName[0]);
    }
    setOpen(true);
  };

  async function verifyEmail() {
    let data = values.email.toLowerCase();
    if (data !== "") {
      axios
        .get("user/verifyEmail/" + data)
        .then(result => {
          if (result.data.success) {
            resetPassword(data);
          } else {
            enqueueSnackbar(values.email + " não foi encontrado", {
              variant: "error",
            });
          }
        })
        .catch(error => {
          enqueueSnackbar("Erro de Redefinição", { variant: "error" });
          console.log(error);
        });
    } else {
      enqueueSnackbar("Erro de E-mail", { variant: "error" });
    }
  }

  async function resetPassword(data) {
    if (values.senha === values.confirmarSenha) {
      let passwordData = {
        senha: values.senha,
      };
      axios
        .put("user/changePassword/" + data, passwordData)
        .then(result => {
          if (result.data.success) {
            enqueueSnackbar("Senha Redefinida", { variant: "success" });
            clearPasswordFields();
          } else {
            console.log(result.data);
            enqueueSnackbar("Erro em redefinir senha", { variant: "error" });
          }
        })
        .catch(error => {
          enqueueSnackbar("Falha de Redefinição", { variant: "error" });
          console.log(error);
        });
    } else {
      enqueueSnackbar("Senhas Não Iguais", { variant: "error" });
    }
  }

  const clearPasswordFields = () => {
    setValues({
      ...values,
      senha: "",
      confirmarSenha: "",
    });
    setTextStates({
      ...textStates,
      confirmarSenha: true,
    });

    setDisabledButton(true);
  };

  function handleResetPassword() {
    if (values.senha !== "") {
      verifyEmail();
    }
  }

  async function handleLogout() {
    closeSnackbar();

    localStorage.clear();

    axios
      .post("user/auth/logout/" + user.id)
      .then(result => {
        if (result.data.success) {
          window.location.reload(true);
        } else {
          enqueueSnackbar("Erro de Logout", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  }

  if (user) {
    return (
      <React.Fragment>
        <TableContainer component={Paper} className={classes.mainContainer}>
          <div className={classes.menuContainer}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              Perfil
            </Typography>
          </div>
          <Divider /*variant="middle"*/ className={classes.divider} />
          <Grid container spacing={3} className={classes.textContainer}>
            <Grid xs={12} sm={4}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.textField}>
                Nome Completo
              </Typography>
            </Grid>
            <Grid xs={11} sm={7}>
              <TextField
                id="standard-basic-1"
                name="nome_completo"
                disabled={textStates.nome_completo}
                value={values.nome_completo}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={1} sm={1}>
              <div className={classes.editButton}>
                <EditIcon onClick={() => handleFieldClick(1)} />
              </div>
            </Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          <Grid container spacing={3} className={classes.textContainer}>
            <Grid xs={12} sm={4}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.textField}>
                Nome de usuário
              </Typography>
            </Grid>
            <Grid xs={11} sm={7}>
              <TextField
                id="standard-basic-2"
                name="nome_usuario"
                disabled={textStates.nome_usuario}
                value={values.nome_usuario}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={1} sm={1}>
              <div className={classes.editButton}>
                <EditIcon onClick={() => handleFieldClick(2)} />
              </div>
            </Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          <Grid container spacing={3} className={classes.textContainer}>
            <Grid xs={12} sm={4}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.textField}>
                E-mail
              </Typography>
            </Grid>
            <Grid xs={11} sm={7}>
              <TextField
                id="standard-basic-3"
                name="email"
                disabled={textStates.email}
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={1} sm={1}>
              <div className={classes.editButton}>
                <EditIcon onClick={() => handleFieldClick(3)} />
              </div>
            </Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />

          <Grid container spacing={3} className={classes.textContainer}>
            <Grid xs={11} sm={11}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.textField}>
                Redefinir senha
              </Typography>
            </Grid>
            <Grid xs={1} sm={1}>
              <div className={classes.editButton}>
                {openPassword ? (
                  <ExpandLessIcon
                    onClick={() => setOpenPassword(!openPassword)}
                  />
                ) : (
                  <ChevronRightIcon
                    onClick={() => setOpenPassword(!openPassword)}
                  />
                )}
              </div>
            </Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          {openPassword && (
            <>
              <Grid container spacing={3} className={classes.textContainer}>
                <Grid xs={5} sm={5}>
                  <TextField
                    id="standard-basic-4"
                    name="senha"
                    label="senha"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="off"
                    value={values.senha}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            edge="end">
                            {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={2} sm={2}>
                  <span></span>
                </Grid>
                <Grid xs={5} sm={5}>
                  <TextField
                    id="standard-basic-5"
                    name="confirmarSenha"
                    label="confirmar senha"
                    type={secondPasswordVisible ? "text" : "password"}
                    autoComplete="off"
                    disabled={textStates.confirmarSenha}
                    value={values.confirmarSenha}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setSecondPasswordVisible(!secondPasswordVisible)
                            }
                            edge="end">
                            {secondPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} className={classes.textContainer}>
                <Grid xs={10} sm={10}>
                  <span></span>
                </Grid>
                <Grid xs={2} sm={2}>
                  <div className={classes.resetButton}>
                    <Button
                      variant="outlined"
                      disabled={disableButton}
                      onClick={() => handleResetPassword()}>
                      Redefinir
                    </Button>
                  </div>
                </Grid>
              </Grid>
              {/* <Divider variant="middle" className={classes.divider} /> */}
            </>
          )}
          {openPassword && (
            <Divider variant="middle" className={classes.divider} />
          )}
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="secondary"
              disabled={saveButton}
              onClick={() => handleSave()}
              className={classes.button}
              startIcon={<SaveIcon />}>
              Salvar
            </Button>
          </div>

          <div className={classes.deleteContainer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
              className={classes.button}
              startIcon={<DeleteIcon />}>
              Apagar minha conta
            </Button>
          </div>
        </TableContainer>
        <DeleteDialog
          open={open}
          setOpen={setOpen}
          DeleteAccount={DeleteAccount}
          username={username}
        />
        <EmailDialog
          open={openEmailDialog}
          setOpen={setOpenEmailDialog}
          handleLogout={handleLogout}
          saveData={saveData}
        />
      </React.Fragment>
    );
  } else {
    return (
      <Redirect to={{ pathname: "/", state: { from: location.pathname } }} />
    );
  }
}
