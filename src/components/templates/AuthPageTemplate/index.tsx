import React from 'react';
import { match } from 'react-router';
import { Wrapper } from '../../atoms/Wrapper';
import { MainContainer } from '../MainContainer';
import { Pages } from '../../../router/endpoints';

import './authPageTemplate.scss';

interface IAuthPageTemplate {
  header?: React.ReactElement;
  authForm?: React.ReactElement;
  isLoginPage?: match<Record<string, never>> | null;
}

export const AuthPageTemplate: React.FC<IAuthPageTemplate> = ({
  header,
  authForm,
  isLoginPage,
}): React.ReactElement => {
  return (
    <MainContainer page={Pages.auth}>
      <Wrapper flex column align="center" className="auth-page__aside-form">
        <Wrapper className={isLoginPage ? 'aside-form__login-inner' : 'aside-form__signup-inner'}>
          {header}
          {authForm}
        </Wrapper>
      </Wrapper>
      <Wrapper className="auth-page__aside-image" />
    </MainContainer>
  );
};
