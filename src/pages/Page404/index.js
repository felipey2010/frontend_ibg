import React from "react";
import { Link } from "react-router-dom";
// Libraries
import { useLocation } from "react-router-dom";
// Components
import { Container, Text, Description, Button } from "./style";

export default function Page404() {
  let location = useLocation();
  return (
    <Container>
      <Text>404</Text>
      <Description>
        Página <strong>{location.pathname} não encontrada</strong>
      </Description>
      <Button>
        Volte para a <Link to="/">Página inicial</Link>
      </Button>
    </Container>
  );
}
