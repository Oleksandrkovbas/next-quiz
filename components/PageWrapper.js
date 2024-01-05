import * as React from 'react';
import styled from 'styled-components';

import background from './images/background.png';
import logo from './images/logo.jpg';
import appConfig from '../config';
import Footer from './Footer';

const PageWrapperWrapper = styled.div`
  background: url("${background}");
  background-size: cover;
  justify-content: center;
  
  main {
    display: block;
    margin-top: 20px;
    width: 100%;
    @media screen and (min-width: 992px) {
      margin-top: 30px;
    }
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  max-width: 90%;
  padding: 33px 10px 10px;
  display: block;
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 992px) {
    max-width: 770px;
    padding: 21px 0 0;
    width: 100%;
  }
`;

const Header = styled.div`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  color: ${appConfig.theme.primaryColor};
  max-height: 225px;

  @media screen and (min-width: 992px) {
    justify-content: space-between;
    align-items: center;
  }

  .description {
    text-align: left;
    white-space: pre-line;
    font-size: 13px;
    padding: 0 10px;
    margin-top: 15px;
    line-height: 24px;

    > p > span {
      display: block;
      width: 100%;
    }

    @media screen and (min-width: 992px) {
      margin-left: auto;
      left: auto;
      right: auto;
      text-align: right;
    }
  }
`;

const Logo = styled.div`
  img {
    max-height: 120px;
  }
`;

export const PageWrapper = (props) => {
  return (
    <PageWrapperWrapper className={'ui-flex PageWrapper PageWrapper_Wrapper'}>
      <PageContainer>
        <Header className={'ui-flex'}>
          <Logo>
            <img src={logo} alt="Logo" />
          </Logo>

          <span className="description">
            <p>
              <span>TravelOkTutor</span>
              <span>М. Київ , вул. Анни Ахматової 22. Київ, 02081</span>
              <span>Телефонуйте: +380980543223</span>
            </p>
          </span>
        </Header>

        <main>{props.children}</main>

        <Footer />
      </PageContainer>
    </PageWrapperWrapper>
  );
};

export default PageWrapper;
