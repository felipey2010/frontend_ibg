import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  columnDiv: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginLeft: 8,
  },
  errorMsg: {
    margin: "14px 0 0 0",
    textAlign: "right",
    fontSize: "14px",
    color: "rgb(252, 85, 85)",
  },
}));

export default function EmailForm({
  email,
  setEmail,
  emailError,
  /*handleNext*/
}) {
  const classes = useStyles();

  const handleChange = event => {
    setEmail(event.target.value.trim());
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.columnDiv}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          Informe o e-mail cadastrado
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          fullWidth
          label="E-mail"
          type="email"
          value={email}
          // onKeyDown={e => {
          //   if (e.key === "Enter") {
          //     handleNext();
          //   }
          // }}
          onChange={handleChange}
          variant="outlined"
          gutterBottom
        />
        <p className={classes.errorMsg}>{emailError}</p>
      </div>
    </form>
  );
}
