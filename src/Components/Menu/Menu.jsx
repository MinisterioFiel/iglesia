import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Container = styled.div`
  margin-top: 20px;
  height: 100px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & a {
    display: inline;
    text-decoration: none;
    color: #3c3c3b;
    transition: all 1s ease;
    padding: 5px;
    border: 1px solid transparent;

    &:hover {
      color: black;
      transform: scale(1.1);
    }

    ${(props) =>
      props.color === 'white' &&
      css`
        color: white;
      `}
  }
`;

const Menu = (props) => {
  return (
    <Container>
      <Flex color={props.color}>
        <Link to="/">Inicio</Link>
        <Link to="/quienesSomos">Quienes Somos</Link>

        <a
          href="https://palabrafiel.online.church/"
          target="_blank"
          rel="noreferrer"
        >
          En vivo
        </a>
        <a href="#agenda">Nuestra Agenda</a>

        <Link to="/gruposdecrecimiento">Grupos de Crecimiento</Link>

        <Link to="/soynuevo">Soy Nuevo</Link>

        <NavDropdown
          id="nav-dropdown-dark-example"
          title="Ministerios"
          menuVariant="dark"
        >
          <NavDropdown.Item
            href="https://instituto.ministeriospalabrafiel.org"
            target="_blank"
          >
            Instituto Biblico
          </NavDropdown.Item>
        </NavDropdown>

        <Link to="/">Dar</Link>
      </Flex>
    </Container>
  );
};

export default Menu;
