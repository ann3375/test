import React from 'react';
import classNames from 'classnames';
import { Wrapper } from '../Wrapper';
import { Icon } from '../Icon';
import { IconName } from '../Icon/types/types';
import { LogoSize } from './types/types';

import './logo.scss';

interface ILogo {
  size: LogoSize;
  className?: string;
}

export const Logo: React.FC<ILogo> = ({ size, className }) => {
  const classProps = classNames('logo', {
    [`logo_size_${size}`]: size,
    [`${className}`]: className,
  });

  return (
    <Wrapper className={classProps}>
      <Icon name={IconName.logo} />
    </Wrapper>
  );
};
