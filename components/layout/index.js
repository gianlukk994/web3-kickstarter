import React from "react";
import { Container } from "semantic-ui-react";
import Header from "../header";

const Layout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

export default Layout;
