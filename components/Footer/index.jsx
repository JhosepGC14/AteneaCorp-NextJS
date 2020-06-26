import React from "react";
import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  width: 100%;
  height: 80px;
  background: var(--darkBlue);
  /* text-align: center; */
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>Todos los derechos reservados 2020 &copy; - Jhosep GC</p>
    </StyledFooter>
  );
};

export default Footer;
