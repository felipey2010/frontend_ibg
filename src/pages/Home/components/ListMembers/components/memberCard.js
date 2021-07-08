import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import maleProfile from "../../../../../images/male_profile.png";
import femaleProfile from "../../../../../images/female_profile.png";
import DeleteButton from "./deleteDialog";
import EditMemberModal from "./editButton";
import ViewMemberModal from "./viewButton";

const useStyles = makeStyles(theme => ({
  container: {
    // padding: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    maxWidth: "100%",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.5s ease",
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  horizontalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  button: {
    color: "#c11c1c",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.1s",
    },
  },
}));

export default function MemberCard({ members, getMembers }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [memberData, setMemberData] = useState([]);

  function handleOpen(member) {
    setOpen(true);
    setMemberData(member);
  }

  function handleOpenView(member) {
    setOpenView(true);
    setMemberData(member);
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {members.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
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
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {member.nome_completo}
                    </Typography>
                    <Divider variant="middle" className={classes.divider} />
                    <div className={classes.horizontalContainer}>
                      <Typography>{member.bairro}</Typography>
                      <Typography>-</Typography>
                      <Typography>{member.cidade}</Typography>
                      <Typography>-</Typography>
                      <Typography>{member.estado}</Typography>
                    </div>
                    <div className={classes.horizontalContainer}>
                      <Typography>{member.estado_civil}</Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography>{member.natural}</Typography>
                      <Divider orientation="vertical" flexItem />
                      <Typography>{member.celular}</Typography>
                    </div>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpenView(member)}
                      className={classes.button}>
                      Ver
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(member)}
                      className={classes.button}>
                      Editar
                    </Button>
                    <DeleteButton member={member} getMembers={getMembers} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      {open && (
        <EditMemberModal
          open={open}
          setOpen={setOpen}
          member={memberData}
          getMembers={getMembers}
        />
      )}
      {openView && (
        <ViewMemberModal
          open={openView}
          setOpen={setOpenView}
          setOpenEdit={setOpen}
          member={memberData}
        />
      )}
    </React.Fragment>
  );
}
