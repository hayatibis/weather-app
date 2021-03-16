import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer id="site-footer">
      <div className="container">
        <span className="text-muted">
          Hayati Ibis &copy; {new Date().getFullYear()}
        </span>
      </div>
    </FooterContainer>
  );
};

export default Footer;

// FOOTER CONTAINER
const FooterContainer = styled.footer`
  background: black;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;
