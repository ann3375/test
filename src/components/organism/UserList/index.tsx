import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { IUserListItem, UserListItem } from '../../molecules/UserListItem';
import { UserListNotification } from '../../molecules/UserListNotification';
import { Spinner } from '../../molecules/Spinner';
import { UserGender } from '../../atoms/Avatar/types/types';
import { MessageType } from '../../../store/types/types';

import './userList.scss';

interface IUserList {
  isVisibleUserList: boolean;
  users: IUserListItem[];
  isLoaded: boolean;
  getLastMessage: (id: string) => MessageType | undefined;
  handleVisibleUserList: () => void;
  setDialogInfo: (username: string, lastseen: string, gender: UserGender) => void;
}

export const UserList: React.FC<IUserList> = observer(
  ({
    isVisibleUserList,
    users,
    isLoaded,
    setDialogInfo,
    getLastMessage,
    handleVisibleUserList,
  }): React.ReactElement => {
    const classProps = classNames('user-list', {
      ['user-list_active']: isVisibleUserList,
    });

    return (
      <div className={classProps}>
        {isLoaded ? (
          users.length ? (
            users.map((user, index) => (
              <UserListItem
                handleVisibleUserList={handleVisibleUserList}
                setDialogInfo={setDialogInfo}
                key={`${user.name}_${index}`}
                id={`${user.name}_${index}`}
                name={user.name}
                gender={user.gender}
                lastMessage={getLastMessage(user.name)}
                isCurrentUserLastMessage={user.isCurrentUserLastMessage}
              />
            ))
          ) : (
            <UserListNotification className="user-list__no-user-block" />
          )
        ) : (
          <Spinner className="user-list__spinner" />
        )}
      </div>
    );
  }
);
