import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Logo } from '../../atoms/Logo';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { UserMenuPopup } from '../../molecules/UserMenuPopup';
import { ButtonIcon } from '../../molecules/ButtonIcon';
import { ColorType, IconName } from '../../atoms/Icon/types/types';
import { LogoSize } from '../../atoms/Logo/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { ButtonType } from '../../atoms/Button/types/types';
import { SCREENS } from '../../../router/endpoints';

import './header.scss';

interface IHeader {
  isLoginPage?: boolean;
  isChatPage?: boolean;
}

export const Header = React.memo(function Header({ isLoginPage, isChatPage }: IHeader) {
  const [isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false);

  const handleVisiblePopup = useCallback(() => {
    setIsVisiblePopup(!isVisiblePopup);
  }, [isVisiblePopup]);

  const classProps = classNames('header', {
    [`auth-page__header`]: isLoginPage,
    [`chat-page__header`]: isChatPage,
  });

  return (
    <header className={classProps}>
      {isChatPage ? (
        <NavLink to={isChatPage ? SCREENS.SCREEN_DIALOGS : SCREENS.SCREEN_LOGIN}>
          <Logo size={LogoSize.large} className="header__logo" />
        </NavLink>
      ) : (
        <Logo size={LogoSize.large} className="header__logo" />
      )}

      {isLoginPage ? (
        <Typography variant={TypographyTypeStyle.h1} className="header__text">
          Wellcome to
          <Typography variant={TypographyTypeStyle.span} color={ColorType.primary}>
            {' '}
            Chatty
          </Typography>
          <Typography variant={TypographyTypeStyle.span} color={ColorType.mediumBlue}>
            !
          </Typography>
        </Typography>
      ) : (
        <Wrapper className="header__info">
          <ButtonIcon
            className="header__button"
            type={ButtonType.button}
            color={ColorType.primary}
            iconName={IconName.userIcon}
            onClick={handleVisiblePopup}
          />
          <Wrapper
            className={classNames('header__user-menu-popup', {
              'header__user-menu-popup_active': isVisiblePopup,
            })}
          >
            <UserMenuPopup handleVisiblePopup={handleVisiblePopup} />
          </Wrapper>
        </Wrapper>
      )}
    </header>
  );
});
