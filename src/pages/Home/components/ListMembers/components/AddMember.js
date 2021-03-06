import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import DadosPessoais from "./DadosPessoais.js";
import DadoEscolar from "./DadoEscolar.js";
import DadoMinisterio from "./DadoMinisterio";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useSnackbar } from "notistack";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "black",
    },
  },
  paper: {
    position: "absolute",
    width: "60vw",
    height: "80vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // transition: "10s ease-in",
    "& .MuiInput-underline": {
      "&::after": {
        borderBottom: "2px solid #c11c1c",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "black",
    },
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "black",
    },
    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#c11c1c",
    },
    "& .MuiSwitch-colorPrimary.Mui-checked": {
      color: "#c11c1c",
    },
    "& .MuiSwitch-switchBase": {
      color: "#cecece",
    },
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    width: "60vw",
    height: 32,
    padding: 0,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 10,
    right: 20,
    width: 32,
    height: 32,
    padding: 0,
  },
  title: {
    position: "absolute",
    top: 10,
    left: 25,
    height: 32,
    padding: 0,
  },
  divider: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    padding: 0,
  },
  stepper: {
    padding: theme.spacing(2, 0, 4),
    minWidth: 405,
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
  },
  container: {
    position: "absolute",
    height: "50vh",
    overflowY: "auto",
    overflowX: "hidden",
    border: "1px solid #00000040",
    borderStyle: "groove",
    top: 120,
    left: 25,
    right: 25,
    padding: 0,
  },
  buttons: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    bottom: "1vh",
    right: 25,
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "#c11c1c",
    "&:hover": {
      backgroundColor: "#5d0202",
    },
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default function AddMember({ open, setOpen, getMembers }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const steps = ["Dados Pessoais", "Escolaridade", "Ministério"];

  const [values, setValues] = useState({
    name: "",
    sex: "",
    address: "",
    district: "",
    city: "",
    state: "",
    birthdate: "",
    marriedStatus: "",
    marriedStatus_Other: "",
    pgm: "",
    name_pgm: "",
    ministry: "",
    name_ministry: "",
    date_ministry: "",
    status_baptism: "",
    date_baptism: "",
    date_membership: "",
    rg: "",
    cpf: "",
    cep: "",
    email: "",
    celular: "",
    telefone: "",
    partner_name: "",
    activeMember: true,
    natural: "",
    blood_donor: "",
    blood_type: "",
    name_father: "",
    name_mother: "",
    children: "",
    profession: "",
    school_level: "",
    social_media: "",
  });

  //Check how to use this
  //https://github.com/briancodex/react-modal-v1/blob/ba01ff0a7e0e355d5e932663a4cb6647120c3bee/src/components/Modal.js#L67
  //   const animation = useSpring({
  //     config: {
  //       duration: 250,
  //     },
  //     opacity: open ? 1 : 0,
  //     transform: open ? `translate(-50%)` : `translate(-100%)`,
  //   });

  function getFormattedDate(input) {
    let output = "";
    input.replace(
      /^\D*(\d{0,2})\D*(\d{0,2})\D*(\d{0,4})/,
      function (match, g1, g2, g3) {
        if (g1.length) {
          output += g1;
          if (g1.length === 2) {
            output += "/";
            if (g2.length) {
              output += g2;
              if (g2.length === 2) {
                output += "/";
                if (g3.length) {
                  output += g3;
                }
              }
            }
          }
        }
      }
    );
    return output;
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DadosPessoais
            values={values}
            setValues={setValues}
            getFormattedDate={getFormattedDate}
          />
        );
      case 1:
        return <DadoEscolar values={values} setValues={setValues} />;
      case 2:
        return (
          <DadoMinisterio
            values={values}
            setValues={setValues}
            getFormattedDate={getFormattedDate}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    closeSnackbar();

    checkErrors(activeStep);

    // setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function checkErrors(number) {
    if (number === 0) {
      if (
        values.name === "" ||
        values.sex === "" ||
        values.address === "" ||
        values.district === "" ||
        values.city === "" ||
        values.state === "" ||
        values.birthdate === "" ||
        values.marriedStatus === "" ||
        values.cpf === "" ||
        values.cep === "" ||
        values.email === "" ||
        values.celular === "" ||
        values.natural === "" ||
        values.blood_donor === "" ||
        values.blood_type === ""
      ) {
        //send alert
        enqueueSnackbar("Preencha campos obrigatórios", { variant: "error" });
      } else {
        setActiveStep(activeStep + 1);
      }
    } else if (number === steps.length - 1) {
      if (
        values.pgm === "" ||
        values.ministry === "" ||
        values.status_baptism === ""
      ) {
        //send alert
        enqueueSnackbar("Preencha campos obrigatórios", { variant: "error" });
      } else {
        AddMember();
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  const clearFields = () => {
    setValues({
      name: "",
      sex: "",
      address: "",
      district: "",
      city: "",
      state: "",
      cep: "",
      birthdate: "",
      marriedStatus: "",
      marriedStatus_Other: "",
      pgm: "",
      name_pgm: "",
      ministry: "",
      name_ministry: "",
      date_ministry: "",
      status_baptism: "",
      date_baptism: "",
      date_membership: "",
      activeMember: true,
      rg: "",
      cpf: "",
      email: "",
      celular: "",
      telefone: "",
      partner_name: "",
      natural: "",
      blood_donor: "",
      blood_type: "",
      name_father: "",
      name_mother: "",
      children: "",
      profession: "",
      school_level: "",
      social_media: "",
    });
    setActiveStep(0);
  };

  const handleCancel = () => {
    handleClose();
    clearFields();
  };

  async function AddMember() {
    const params = {
      nome_completo: values.name,
      sexo: values.sex,
      endereco: values.address,
      bairro: values.district,
      cidade: values.city,
      estado: values.state,
      cep: values.cep,
      data_de_nascimento: values.birthdate,
      estado_civil: values.marriedStatus,
      estado_civil_outro: values.marriedStatus_Other,
      participa_PGM: values.pgm,
      nome_PGM: values.name_pgm,
      participa_ministerio: values.ministry,
      nome_ministerio: values.name_ministry,
      data_de_entrada_ministerio: values.date_ministry,
      batizado: values.status_baptism,
      data_de_batismo: values.date_baptism,
      data_de_entrada_membresia: values.date_membership,
      membro_ativo: values.activeMember,
      RG: values.rg,
      CPF: values.cpf,
      email: values.email,
      celular: values.celular,
      telefone: values.telefone,
      nome_do_conjuge: values.partner_name,
      natural: values.natural,
      doador_de_sangue: values.blood_donor,
      tipo_sanguineo: values.blood_type,
      nome_pai: values.name_father,
      nome_mae: values.name_mother,
      nome_dos_filhos: values.children,
      profissao: values.profession,
      escolaridade: values.school_level,
      rede_social: values.social_media,
    };
    axios
      .post("/membros", params)
      .then(res => {
        if (res.data.success) {
          getMembers();
          handleClose();
          clearFields();
          enqueueSnackbar("Membro Cadastrado", { variant: "success" });
        } else {
          enqueueSnackbar("Membro Não Cadastrado", { variant: "error" });
        }
      })
      .catch(error => {
        enqueueSnackbar("Falha em Cadastrar", { variant: "error" });
        console.log(error);
      });
  }

  const body = (
    <div className={classes.paper}>
      <div clasName={classes.header}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          id="simple-modal-title"
          noWrap
          className={classes.title}>
          Adicionar Novo Membro
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <Divider variant="middle" className={classes.divider} />
      <div>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div id="simple-modal-description" className={classes.container}>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </React.Fragment>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancel}
          className={classes.button}>
          <NavLink
            variant="contained"
            color="primary"
            className={classes.link}
            to="/home/membros">
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
          onClick={handleNext}
          className={classes.button}>
          {activeStep === steps.length - 1 ? "Adicionar" : "Próximo"}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick={true}>
        {body}
      </Modal>
    </div>
  );
}
