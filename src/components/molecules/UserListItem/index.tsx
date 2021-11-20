import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { UserGender, AvatarSize } from '../../atoms/Avatar/types/types';
import { Wrapper } from '../../atoms/Wrapper';
import { ColorType } from '../../atoms/Icon/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { SCREENS } from '../../../router/endpoints';
import { MessageType } from '../../../store/types/types';
import { formatLastUserMessage } from '../../../utils/formatLastUserMessage';

import './userListItem.scss';

export interface IUserListItem {
  name: string;
  gender: UserGender;
  id: string;
  setDialogInfo: (username: string, lastseen: string, gender: UserGender) => void;
  handleVisibleUserList: () => void;
  isCurrentUserLastMessage?: boolean;
  lastMessage?: MessageType;
}

export const UserListItem = React.memo(function UserListItem({
  name,
  gender,
  id,
  lastMessage,
  setDialogInfo,
  handleVisibleUserList,
}: IUserListItem) {
  const isCurrentUserLastMessage = lastMessage?.forUser === name;

  return (
    <NavLink
      to={`${SCREENS.SCREEN_DIALOGS}/${id}`}
      className="user-list__link"
      activeClassName="user-list__link_active"
      onClick={() => {
        handleVisibleUserList();
        setDialogInfo(name, 'Last seen recently', gender);
      }}
    >
      <Avatar size={AvatarSize.medium} gender={gender} className="link__avatar" />
      <Wrapper className="link__info">
        <Typography variant={TypographyTypeStyle.h4} className={'link__username'}>
          {name}
        </Typography>
        <Typography variant={TypographyTypeStyle.p2} className={'link__last-message'}>
          {isCurrentUserLastMessage && (
            <Typography variant={TypographyTypeStyle.span} color={ColorType.primary}>
              You:{' '}
            </Typography>
          )}
          {formatLastUserMessage(lastMessage)}
        </Typography>
      </Wrapper>
    </NavLink>
  );
});
