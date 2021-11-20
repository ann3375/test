import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../atoms/Button';
import { Wrapper } from '../../atoms/Wrapper';
import { SCREENS } from '../../../router/endpoints';
import { localStorageUtils } from '../../../utils/localStorageUtils';
import { ButtonType } from '../../atoms/Button/types/types';
import { RootStoreContext } from '../../../store/RootStore';

import './userMenuPopup.scss';

interface IUserMenuPopup {
  handleVisiblePopup: () => void;
}

export const UserMenuPopup: React.FC<IUserMenuPopup> = ({ handleVisiblePopup }) => {
  const history = useHistory();
  const { dialogStore, userStore, userListStore } = useContext(RootStoreContext);

  const handleClearDialogsButton = () => {
    handleVisiblePopup();
    localStorageUtils.clearDialogs();
    dialogStore.clearDialogs();
  };

  const handleLogoutButton = () => {
    handleVisiblePopup();
    userStore.clearUserInfo();
    userListStore.clearUserListStore();
    dialogStore.clearDialogStore();
    history.push(SCREENS.SCREEN_LOGIN);
  };

  return (
    <Wrapper className="user-menu-popup">
      <ul className="user-menu-popup__list">
        <li className="user-menu-popup__item">
          <Button
            type={ButtonType.button}
            onClick={handleClearDialogsButton}
            className="user-menu-popup__button"
          >
            Очистить чаты
          </Button>
        </li>
        <li className="user-menu-popup__item">
          <Button
            type={ButtonType.button}
            onClick={handleLogoutButton}
            className="user-menu-popup__button"
          >
            Выйти
          </Button>
        </li>
      </ul>
    </Wrapper>
  );
};
