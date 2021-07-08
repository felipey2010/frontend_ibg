import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import maleProfile from "../../../../../../images/male_profile.png";
import femaleProfile from "../../../../../../images/female_profile.png";

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
    color: "#847e7e",
    transform: "scale(0.8)",
    "&:hover": {
      transform: "scale(1)",
      color: "#000000",
    },
  },
  headerTitle: {
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
    height: "60vh",
    overflowY: "auto",
    overflowX: "hidden",
    border: "1px solid #00000040",
    borderStyle: "groove",
    top: 65,
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
  insideContainer: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1),
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%", // 16:9
    transform: "scale(0.9)",
  },
  imageDiv: {
    width: 200,
    height: 220,
    flexGrow: 0,
  },
  textSession: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(2),
    flexGrow: 2,
    // justifyContent: "center",
  },
  textDiv: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textDivRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  text: {
    paddingLeft: theme.spacing(1),
    fontSize: 15,
  },
  separator: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

export default function ViewMember({ open, setOpen, member, setOpenEdit }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClose = () => {
    setOpenEdit(true);
  };

  const body = (
    <div className={classes.paper}>
      <div clasName={classes.header}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          id="simple-modal-title"
          noWrap
          className={classes.headerTitle}>
          Detalhes
        </Typography>
        <CloseIcon className={classes.closeButton} onClick={handleClose} />
      </div>
      <Divider variant="middle" className={classes.divider} />
      <div id="simple-modal-description" className={classes.container}>
        <div className={classes.insideContainer}>
          <div className={classes.imageDiv}>
            <Card className={classes.card}>
              {member.sexo === "Masculino" ? (
                <CardMedia
                  className={classes.cardMedia}
                  image={maleProfile}
                  title={member.nome_completo}
                />
              ) : (
                <CardMedia
                  className={classes.cardMedia}
                  image={femaleProfile}
                  title={member.nome_completo}
                />
              )}
            </Card>
          </div>
          <div className={classes.textSession}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Nome:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.nome_completo}
              </Typography>
            </div>
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Gênero:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.sexo}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Estado Civil:
                </Typography>
                {member.estado_civil === "Outro" ? (
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes.text}>
                    {member.estado_civil_outro}
                  </Typography>
                ) : (
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes.text}>
                    {member.estado_civil}
                  </Typography>
                )}
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  RG:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.RG}
                </Typography>
              </div>
            </div>
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Natural:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.natural}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Doador de Sangue:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.doador_de_sangue}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Tipo Sanguineo:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.tipo_sanguineo}
                </Typography>
              </div>
            </div>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Data de Nascimento:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.data_de_nascimento}
              </Typography>
            </div>
            <div>
              <Divider variant="middle" className={classes.separator} />
            </div>

            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Endereço:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.endereco}, {member.bairro}, {member.cidade},{" "}
                {member.estado}
              </Typography>
            </div>
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  CEP:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.cep}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  CPF:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.CPF}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Celular:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.celular}
                </Typography>
              </div>
            </div>
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  E-mail:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.email}
                </Typography>
              </div>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Telefone:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.telefone}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Divider variant="middle" className={classes.separator} />
        </div>
        {/* Details for PGM, Ministry and Membership */}
        <div className={classes.bottomContainer}>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Participa em PGM:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.participa_PGM}
              </Typography>
            </div>
            {member.participa_pgm === "Sim" && (
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Local de PGM:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.nome_PGM}
                </Typography>
              </div>
            )}
          </div>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Participa em Ministério:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.participa_ministerio}
              </Typography>
            </div>
            {member.participa_ministerio === "Sim" && (
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Qual Ministério:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.nome_ministerio}
                </Typography>
              </div>
            )}
            {member.participa_ministerio === "Sim" && (
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Data de Entrada:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.data_de_entrada_ministerio}
                </Typography>
              </div>
            )}
          </div>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Batizado:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.batizado}
              </Typography>
            </div>
            {member.batizado === "Sim" && (
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Data de Batismo:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.data_de_batismo}
                </Typography>
              </div>
            )}
          </div>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Membro Ativo:
              </Typography>
              {member.membro_ativo ? (
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  Sim
                </Typography>
              ) : (
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  Não
                </Typography>
              )}
            </div>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Data de Membresia
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.data_de_entrada_membresia}
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <Divider variant="middle" className={classes.separator} />
        </div>
        {/* Family Details */}
        <div className={classes.bottomContainer}>
          {member.nome_do_conjuge !== "" && (
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Nome do conjuge:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.nome_do_conjuge}
                </Typography>
              </div>
            </div>
          )}

          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Nome da mãe:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.nome_mae}
              </Typography>
            </div>
          </div>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Nome do pai:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.nome_pai}
              </Typography>
            </div>
          </div>

          {member.nome_dos_filhos !== "" && (
            <div className={classes.textDivRow}>
              <div className={classes.textDiv}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.title}>
                  Nome dos filhos:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  className={classes.text}>
                  {member.nome_dos_filhos}
                </Typography>
              </div>
            </div>
          )}
        </div>

        <div>
          <Divider variant="middle" className={classes.separator} />
        </div>
        {/* Profession Details */}
        <div className={classes.bottomContainer}>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Profissão:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.profissao}
              </Typography>
            </div>

            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Escolaridade:
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.escolaridade}
              </Typography>
            </div>
          </div>
          <div className={classes.textDivRow}>
            <div className={classes.textDiv}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.title}>
                Rede(s) Social(ias):
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.text}>
                {member.rede_social}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClose}
          className={classes.button}>
          Editar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          className={classes.button}>
          Fechar
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
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
}
