import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: "1.8em",
  },
  formulario: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "10px",
  },
  textField: {
    width: "100%",
    marginBottom: "10px",
  },

  root: {
    display: "flex",
  },
  button: {
    width: "50%",
    margin: theme.spacing(1),
    backgroundColor: "#c11c1c",
    color: "white",
    borderRadius: 10,
    display: "flex",
    flex: "end",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#5d0202",
    },
  },
  title: {
    flexGrow: 1,
    fontWeight: 700,
  },
  TextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  marginContainer: {
    marginRight: 15,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "space-evenly",
  },
  controlledField: {
    width: "100%",
    marginBottom: "10px",
  },
  selectEmpty: {
    width: "100%",
  },
  dateContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  dateField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: "200",
  },
}));

export default function DadoEscolar({ values, setValues }) {
  const classes = useStyles();
  const theme = useTheme();

  function handleChange(evt) {
    // console.log("new value", evt.target.value);
    if (evt.target.name === "activeMember") {
      setValues({
        ...values,
        [evt.target.name]: evt.target.checked,
      });
    } else {
      setValues({
        ...values,
        [evt.target.name]: evt.target.value,
      });
    }
  }
  return (
    <div className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Profissão"
            name="profession"
            autoComplete="off"
            value={values.profession}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl>
            <Select
              value={values.school_level}
              onChange={handleChange}
              name="school_level"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Escolaridade
              </MenuItem>
              <MenuItem value="Sem instrução">Sem instrução</MenuItem>
              <MenuItem value="Pré-escola">Pré-escola</MenuItem>
              <MenuItem value="Ensino fundamental">Ensino fundamental</MenuItem>
              <MenuItem value="Ensino médio">Ensino médio</MenuItem>
              <MenuItem value="Superior cursando">Superior cursando</MenuItem>
              <MenuItem value="Superior incompleto">
                Superior incompleto
              </MenuItem>
              <MenuItem value="Superior completo">Superior completo</MenuItem>
              <MenuItem value="Especialização">Especialização</MenuItem>
              <MenuItem value="Mestrado">Mestrado</MenuItem>
              <MenuItem value="Doutorado">Doutorado</MenuItem>
              <MenuItem value="PHD">PHD</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            className={classes.controlledField}
            label="Rede(s) social(ais) que participa"
            name="social_media"
            autoComplete="off"
            fullWidth
            value={values.social_media}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}
