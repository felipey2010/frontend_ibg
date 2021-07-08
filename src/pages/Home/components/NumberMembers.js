import React, { useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  link: {
    textDecoration: "none",
    color: "#ce0d0d",
  },
});

export default function NumberMembers({ members }) {
  const classes = useStyles();
  const [totalMembers, setTotalMembers] = useState(0);
  let date = new Date().toLocaleDateString();

  useEffect(() => {
    let numberOfMembers = members.length;
    if (numberOfMembers) {
      setTotalMembers(numberOfMembers);
    } else {
      setTotalMembers(0);
    }
  }, []);

  return (
    <React.Fragment>
      <Title>Número de Membros</Title>
      <Typography component="p" variant="h4">
        {totalMembers}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Atualizado em {date}
      </Typography>
      <div>
        <Link color="primary" to="home/membros" className={classes.link}>
          Ver mais detalhes
        </Link>
      </div>
    </React.Fragment>
  );
}
