import React, { useContext } from 'react';
import { Typography } from '../../atoms/Typography';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { Wrapper } from '../../atoms/Wrapper';
import { Button } from '../../atoms/Button';
import { ButtonType, ButtonVariant } from '../../atoms/Button/types/types';
import { RootStoreContext } from '../../../store/RootStore';

import './modal.scss';

interface IModal {
  notificationText?: string;
  isError?: boolean;
}

export const Modal: React.FC<IModal> = ({ notificationText, isError }) => {
  const { userStore } = useContext(RootStoreContext);

  const handleButtonClick = () => {
    userStore.clearUserInfo();
  };

  return (
    <Wrapper className={'modal'}>
      <Wrapper className="modal__wrapper">
        <Typography variant={TypographyTypeStyle.h3} className="modal__header-text">
          Похоже что-то пошло не так...
        </Typography>

        <Typography variant={TypographyTypeStyle.p1} className="modal__info-text">
          Попытка подключения завершилась неудачно, текст ошибки :
          <Typography variant={TypographyTypeStyle.span} className="modal__error-text">
            {notificationText === 'error' ? 'Проверьте подключение к сети' : notificationText}
          </Typography>
        </Typography>

        <Typography variant={TypographyTypeStyle.p1} className="modal__info-text">
          Пожалуйста, вернитесь на страницу авторизации и попробуйте войти снова.
        </Typography>

        <Button
          type={ButtonType.button}
          variant={ButtonVariant.notification}
          className="modal__button"
          onClick={handleButtonClick}
        >
          На страницу авторизации
        </Button>
      </Wrapper>
    </Wrapper>
  );
};
