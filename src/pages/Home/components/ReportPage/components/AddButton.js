import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// import axios from "axios";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
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
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiInput-underline": {
      "&::after": {
        borderBottom: "2px solid #c11c1c",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "black",
    },
  },
  drawerPaper: {
    width: "50%",
    paddingTop: "10vh",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
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
  input: {
    display: "none",
  },
}));

export default function PersistentDrawerLeft({ open, setOpen }) {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = useState({
    title: "",
    state: "",
    address: "",
    activeMember: true,
  });

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  //   async function AddNinja() {
  //     const params = {
  //       name: values.name,
  //       rank: values.rank,
  //       available: values.available,
  //       geometry: {
  //         coordinates: [parseFloat(values.lat), parseFloat(values.lng)],
  //       },
  //     };
  //     console.log(params);
  //     axios
  //       .post("http://localhost:3001/api/ninjas", params)
  //       .then((res) => {
  //         setValues({
  //           name: "",
  //           available: true,
  //           rank: "",
  //           lat: "",
  //           lng: "",
  //         });
  //         handleDrawerClose();
  //         GetNinjas();
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  return (
    <div className={classes.drawer}>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Adicionar Novo Arquivo
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.formulario}>
          <div className={classes.TextContainer}>
            <TextField
              className={classes.textField}
              label="Título"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <FormControl className={classes.formControl}>
              <Select
                value={values.state}
                onChange={handleChange}
                name="state"
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value="" disabled>
                  Estado
                </MenuItem>
                <MenuItem value="M">Publicado</MenuItem>
                <MenuItem value="F">Não Publicado</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.flexContainer}>
            <div className={classes.marginContainer}>
              <TextField
                className={classes.controlledField}
                label=""
                name="address"
                value={values.address}
                onChange={handleChange}
              />
            </div>
            <div className={classes.marginContainer}>
              <input
                accept="pdf/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </div>
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={values.activeMember}
                onChange={handleChange}
                name="activeMember"
                color="primary"
              />
            }
            label="Disponível"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => console.log("Pressed")}>
            Enviar
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
