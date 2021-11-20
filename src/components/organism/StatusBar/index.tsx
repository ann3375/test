import React from 'react';
import classNames from 'classnames';
import { Wrapper } from '../../atoms/Wrapper';
import { ButtonIcon } from '../../molecules/ButtonIcon';
import { UserStatus } from '../../molecules/UserStatus';
import { ButtonType } from '../../atoms/Button/types/types';
import { ColorType, IconName } from '../../atoms/Icon/types/types';

import './statusBar.scss';

interface IStatusBar {
  isVisibleUserList: boolean;
  dialogInfo: { username: string; gender: string; lastSeen: string };
  handleVisibleUserList: () => void;
}

export const StatusBar: React.FC<IStatusBar> = ({
  isVisibleUserList,
  dialogInfo,
  handleVisibleUserList,
}) => {
  return (
    <Wrapper flex align="center" className="status-bar">
      <ButtonIcon
        iconName={isVisibleUserList ? IconName.closeIcon : IconName.userList}
        type={ButtonType.button}
        color={ColorType.primary}
        onClick={handleVisibleUserList}
        className={classNames('status-bar__user-list-icon', {
          ['status-bar__user-list-icon_transform']: isVisibleUserList,
        })}
      />

      <ButtonIcon
        iconName={IconName.arrowLeft}
        type={ButtonType.button}
        color={ColorType.primary}
        onClick={() => history.back()}
        className={'status-bar__back-icon'}
      />

      <UserStatus
        className="status-bar__user-status"
        username={dialogInfo.username}
        userStatus={dialogInfo.lastSeen}
        gender={dialogInfo.gender}
      />
    </Wrapper>
  );
};
