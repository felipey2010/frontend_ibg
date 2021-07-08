import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";
import axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "white",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#c11c1c",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#c11c1c",
    "&:hover": {
      backgroundColor: "#5d0202",
    },
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstPasswordError, setFirstPasswordError] = useState("");
  const [secondPasswordError, setSecondPasswordError] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [disableButton, setDisableButton] = useState(false);

  const steps = ["Email", "Nova Senha"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <EmailForm
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            // handleNext={handleNext}
          />
        );
      case 1:
        return (
          <PasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            firstPasswordError={firstPasswordError}
            secondPasswordError={secondPasswordError}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  async function verifyEmail() {
    setDisableButton(true);
    let data = email.toLowerCase();
    axios
      .get("user/verifyEmail/" + data)
      .then(result => {
        if (result.data.success) {
          setEmailError("");
          setActiveStep(activeStep + 1);
        } else {
          enqueueSnackbar(email + " não foi encontrado", { variant: "error" });
        }
        setDisableButton(false);
      })
      .catch(error => {
        enqueueSnackbar("Erro de Verificação", { variant: "error" });
        console.log(error);
        setDisableButton(false);
      });
  }

  async function resetPassword() {
    setDisableButton(true);
    let passwordData = {
      senha: password,
    };
    let data = email.toLowerCase();
    axios
      .put("user/changePassword/" + data, passwordData)
      .then(result => {
        if (result.data.success) {
          setActiveStep(activeStep + 1);
        } else {
          console.log(result.data);
          enqueueSnackbar("Erro em redefinir senha", { variant: "error" });
        }
        setDisableButton(false);
      })
      .catch(error => {
        enqueueSnackbar("Falha de Redefinição", { variant: "error" });
        console.log(error);
        setDisableButton(false);
      });
  }

  const handleNext = () => {
    closeSnackbar();
    if (activeStep === 0) {
      setEmailError("");

      if (email === "") {
        setEmailError("É obrigatório preencher este campo");
      } else if (!email.includes("@") || !email.includes(".")) {
        setEmailError("Informe um e-mail válido");
      } else {
        verifyEmail();
      }
    } else {
      setFirstPasswordError("");
      setSecondPasswordError("");
      if (password === "" || confirmPassword === "") {
        setFirstPasswordError("Nenhum campo deve estar vazio");
      } else if (password !== confirmPassword) {
        setFirstPasswordError("As senhas não correspodem");
        setSecondPasswordError("As senhas não correspodem");
      } else if (password.length < 6) {
        setFirstPasswordError("A senha deve ser maior que 6 caracteres");
      } else {
        resetPassword();
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Redefinição de Senha
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Sua senha foi redefinida com êxito.
                </Typography>
                <Typography variant="subtitle1">
                  Não compartilhe sua senha com outras pessoas.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                  className={classes.button}>
                  <NavLink
                    variant="contained"
                    color="primary"
                    className={classes.link}
                    to="/">
                    Login
                  </NavLink>
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    <NavLink
                      variant="contained"
                      color="primary"
                      className={classes.link}
                      to="/">
                      Cancelar
                    </NavLink>
                  </Button>
                  {activeStep !== 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                      className={classes.button}>
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={disableButton}
                    onClick={handleNext}
                    className={classes.button}>
                    {activeStep === steps.length - 1 ? "Redefinir" : "Próximo"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
