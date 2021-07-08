import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

export default function DadoMinisterio({
  values,
  setValues,
  getFormattedDate,
}) {
  const classes = useStyles();
  // const theme = useTheme();

  function handleChange(evt) {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
  }

  const handleDateChange = event => {
    let data = getFormattedDate(event.target.value);

    setValues({
      ...values,
      [event.target.name]: data,
    });
  };

  return (
    <div className={classes.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <Select
              value={values.pgm}
              required
              onChange={handleChange}
              name="pgm"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Participa em algum PGM?
              </MenuItem>
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {values.pgm === "Sim" && (
          <Grid item xs={12} sm={6}>
            <TextField
              // className={classes.textField}
              label="Qual PGM"
              name="name_pgm"
              fullWidth
              autoComplete="off"
              value={values.name_pgm}
              onChange={handleChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <Select
              value={values.ministry}
              required
              onChange={handleChange}
              name="ministry"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Atua em algum Ministério?
              </MenuItem>
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {values.ministry === "Sim" && (
          <Grid item xs={12} sm={6}>
            <TextField
              // className={classes.textField}
              label="Qual Ministério?"
              name="name_ministry"
              fullWidth
              autoComplete="off"
              value={values.name_ministry}
              onChange={handleChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <Select
              value={values.status_baptism}
              required
              onChange={handleChange}
              name="status_baptism"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Batizado?
              </MenuItem>
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {values.status_baptism === "Sim" && (
          <Grid item xs={12} sm={6}>
            <TextField
              id="date_batismo"
              label="Data do Batismo"
              placeholder="dia/mês/ano"
              type="text"
              name="date_baptism"
              fullWidth
              autoComplete="off"
              value={values.date_baptism}
              onChange={handleDateChange}
              className={classes.controlledField}
            />
          </Grid>
        )}
        {values.ministry === "Sim" && (
          <Grid item xs={12} sm={6}>
            <TextField
              id="date_participation"
              label="Data de início de participação"
              placeholder="dia/mês/ano"
              type="text"
              name="date_ministry"
              fullWidth
              autoComplete="off"
              value={values.date_ministry}
              onChange={handleDateChange}
              className={classes.controlledField}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            id="date_membership"
            label="Data de entrada no rol de membros"
            placeholder="dia/mês/ano"
            type="text"
            name="date_membership"
            fullWidth
            autoComplete="off"
            value={values.date_membership}
            onChange={handleDateChange}
            className={classes.controlledField}
          />
        </Grid>
      </Grid>
    </div>
  );
}
