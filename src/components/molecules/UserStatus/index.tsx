import React from 'react';
import classNames from 'classnames';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { AvatarSize } from '../../atoms/Avatar/types/types';

import './userStatus.scss';

interface IUserStatus {
  username: string;
  userStatus: string;
  gender: string;
  className?: string;
}

export const UserStatus: React.FC<IUserStatus> = ({ username, userStatus, gender, className }) => {
  const classProps = classNames('user-status', {
    [`${className}`]: className,
  });

  return (
    <Wrapper flex row className={classProps}>
      <Avatar size={AvatarSize.small} gender={gender} className="user-status__avatar" />
      <Wrapper flex column>
        <Typography variant={TypographyTypeStyle.h3} className="user-status__username">
          {username}
        </Typography>
        <Typography variant={TypographyTypeStyle.p1} className="user-status__last-seen">
          {userStatus}
        </Typography>
      </Wrapper>
    </Wrapper>
  );
};
