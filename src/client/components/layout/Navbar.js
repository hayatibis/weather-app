/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarContainer id="site-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="nav-link" href="/weather">Weather</a>
          <a className="nav-link" href="/admin">Admin</a>
        </div>
      </nav>
    </NavbarContainer>
  );
};

export default Navbar;


// MAIN NAVBAR CONTAINER
const NavbarContainer = styled.header`
  background: var(--dark-blue);
  .nav-link {
    color: #fff !important;
    &:hover {
      background: var(--dark-gray)
    }
  }
  img {
    margin: 1%;
    margin-left: 5%;
  }
`;
