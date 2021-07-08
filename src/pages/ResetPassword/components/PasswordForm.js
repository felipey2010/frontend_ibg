import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  main: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginLeft: 8,
    marginBottom: 8,
  },
  errorMsg: {
    margin: "14px 0 0 0",
    textAlign: "right",
    fontSize: "14px",
    color: "rgb(252, 85, 85)",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  firstPasswordError,
  secondPasswordError,
}) {
  const classes = useStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secondPasswordVisible, setSecondPasswordVisible] = useState(false);

  const handlePassChange = event => {
    setPassword(event.target.value.trim());
  };

  const handleConfirmPassChange = event => {
    setConfirmPassword(event.target.value.trim());
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.main}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          Informe nova senha
        </Typography>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            gutterBottom
            onChange={handlePassChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  edge="end">
                  {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={55}
          />
        </FormControl>
        <p className={classes.errorMsg}>{firstPasswordError}</p>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment">
            Confirme a Nova Senha
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            type={secondPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPassChange}
            endAdornment={
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
            }
            labelWidth={180}
          />
        </FormControl>

        <p className={classes.errorMsg}>{secondPasswordError}</p>
      </div>
    </form>
  );
}
