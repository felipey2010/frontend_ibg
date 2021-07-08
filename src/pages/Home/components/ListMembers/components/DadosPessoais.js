import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

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

export default function DadosPessoais({ values, setValues, getFormattedDate }) {
  const classes = useStyles();
  // const theme = useTheme();

  const handleDateChange = event => {
    let data = getFormattedDate(event.target.value);

    setValues({
      ...values,
      [event.target.name]: data,
    });
  };

  function handleChange(evt) {
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
            required
            label="Nome completo"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl>
            <Select
              value={values.sex}
              required
              onChange={handleChange}
              name="sex"
              autoComplete="off"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Sexo
              </MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl>
            <Select
              value={values.marriedStatus}
              required
              onChange={handleChange}
              name="marriedStatus"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Estado Civil
              </MenuItem>
              {values.sex === "Masculino" && (
                <MenuItem value="Casado">Casado</MenuItem>
              )}
              {values.sex === "Masculino" && (
                <MenuItem value="Solteiro">Solteiro</MenuItem>
              )}
              {values.sex === "Masculino" && (
                <MenuItem value="Divorciado">Divorciado</MenuItem>
              )}
              {values.sex === "Masculino" && (
                <MenuItem value="Viuvo">Viuvo</MenuItem>
              )}
              {values.sex === "Masculino" && (
                <MenuItem value="Outro">Outro</MenuItem>
              )}

              {values.sex === "Feminino" && (
                <MenuItem value="Casada">Casada</MenuItem>
              )}
              {values.sex === "Feminino" && (
                <MenuItem value="Solteira">Solteira</MenuItem>
              )}
              {values.sex === "Feminino" && (
                <MenuItem value="Divorciada">Divorciada</MenuItem>
              )}
              {values.sex === "Feminino" && (
                <MenuItem value="Viuva">Viuva</MenuItem>
              )}
              {values.sex === "Feminino" && (
                <MenuItem value="Outra">Outra</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl>
            <Select
              value={values.blood_donor}
              required
              onChange={handleChange}
              name="blood_donor"
              displayEmpty
              fullWidth
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="" disabled>
                Doador de Sangue
              </MenuItem>
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {(values.marriedStatus === "Casado" ||
          values.marriedStatus === "Casada") && (
          <Grid item xs={12}>
            <TextField
              label="Nome do cônjuge"
              name="partner_name"
              fullWidth
              value={values.partner_name}
              onChange={handleChange}
            />
          </Grid>
        )}
        {(values.marriedStatus === "Outro" ||
          values.marriedStatus === "Outra") && (
          <Grid item xs={12}>
            <TextField
              label="Especifique o estado civil"
              name="marriedStatus_Other"
              fullWidth
              value={values.marriedStatus_Other}
              onChange={handleChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.controlledField}
            label="Natural"
            autoComplete="off"
            name="natural"
            required
            fullWidth
            value={values.natural}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="birthdate"
            label="Data de Nascimento"
            required
            autoComplete="off"
            placeholder="dia/mês/ano"
            type="text"
            name="birthdate"
            fullWidth
            // defaultValue="2017-05-24"
            value={values.birthdate}
            onChange={handleDateChange}
            className={classes.controlledField}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Endereço"
            autoComplete="off"
            required
            name="address"
            fullWidth
            value={values.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            label="Bairro"
            name="district"
            autoComplete="off"
            required
            fullWidth
            value={values.district}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            required
            label="Cidade"
            autoComplete="off"
            name="city"
            fullWidth
            value={values.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            required
            label="Estado"
            autoComplete="off"
            name="state"
            fullWidth
            value={values.state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            label="CEP"
            autoComplete="off"
            name="cep"
            required
            fullWidth
            value={values.cep}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            label="RG"
            autoComplete="off"
            name="rg"
            fullWidth
            value={values.rg}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            required
            autoComplete="off"
            label="CPF"
            name="cpf"
            fullWidth
            value={values.cpf}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            autoComplete="off"
            label="E-mail"
            name="email"
            required
            type="email"
            fullWidth
            value={values.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            required
            autoComplete="off"
            label="Celular"
            name="celular"
            fullWidth
            value={values.celular}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.controlledField}
            label="Telefone"
            name="telefone"
            fullWidth
            value={values.telefone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome do Pai"
            name="name_father"
            autoComplete="off"
            fullWidth
            value={values.name_father}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nome da Mãe"
            name="name_mother"
            autoComplete="off"
            fullWidth
            value={values.name_mother}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Filhos(as)"
            name="children"
            autoComplete="off"
            fullWidth
            value={values.children}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tipo sanguineo"
            name="blood_type"
            autoComplete="off"
            required
            fullWidth
            value={values.blood_type}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={values.activeMember}
                onChange={handleChange}
                name="activeMember"
                color="primary"
              />
            }
            label="Membro Ativo"
          />
        </Grid>
      </Grid>
    </div>
  );
}
