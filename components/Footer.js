import * as React from 'react';
import styled from 'styled-components';
import appConfig from '../config';

const FooterWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-bottom: 50px;

  nav {
    justify-content: center;
    margin: 0;
    padding: 0;
    line-height: 30px;
    height: auto;
    text-align: center;
    box-shadow: none;

    a {
      cursor: pointer;
      text-decoration: none;
      border-right: 1px ${appConfig.theme.primaryColor};
      color: ${appConfig.theme.primaryColor}!important;
      position: relative;
      padding: 1px 15px;
      transition: background-color 0.3s;
      line-height: 30px;
      font-size: 13px;

      &:not(:last-child):after {
        content: '|';
        position: absolute;
        right: -4px;
        top: 1px;
      }
    }
  }
`;

export const Footer = () => {
  return (
    <FooterWrapper className={'ui-flex Footer Footer_Wrapper'}>
      <nav className={'ui-flex'}>
        <a href={'https://traveloktutor.com/about.html'}>About US</a>
        <a href={'https://traveloktutor.com/terms1.html'}>Terms</a>
        <a href={'https://traveloktutor.com/privacy-policy1.html'}>Privacy</a>
        <a href={'mailto:natasha.milto@ukr.net'}>Contact</a>
      </nav>
    </FooterWrapper>
  );
};

export default Footer;
