import React from 'react';
import classNames from 'classnames';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { AvatarSize, UserGender } from '../../atoms/Avatar/types/types';

import './userListNotification.scss';

interface IUserListNotification {
  className: string;
}

export const UserListNotification: React.FC<IUserListNotification> = ({ className }) => {
  const classProps = classNames('no-user-block', {
    [`${className}`]: className,
  });
  return (
    <div className={classProps}>
      <Avatar size={AvatarSize.large} gender={UserGender.noGender} />
      <Typography variant={TypographyTypeStyle.p2} className="no-user-block__text">
        There is no other users yet
      </Typography>
    </div>
  );
};
