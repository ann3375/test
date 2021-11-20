import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { Header } from '../../components/organism/Header';
import { LoginForm } from '../../components/organism/LoginForm';
import { SignUpForm } from '../../components/organism/SignUpForm';
import { AuthPageTemplate } from '../../components/templates/AuthPageTemplate';
import { RootStoreContext } from '../../store/RootStore';
import { SCREENS } from '../../router/endpoints';

export const AuthPage = (): React.ReactElement => {
  const isLoginPage = useRouteMatch(`${SCREENS.SCREEN_LOGIN}`);
  const { genderListStore } = useContext(RootStoreContext);

  useEffect(() => {
    genderListStore.fetchGenderList();
  }, [genderListStore]);

  return (
    <AuthPageTemplate
      header={<Header isLoginPage />}
      authForm={isLoginPage ? <LoginForm /> : <SignUpForm />}
      isLoginPage={isLoginPage}
    />
  );
};
