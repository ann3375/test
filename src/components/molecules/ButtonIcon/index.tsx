import React from 'react';
import { Button } from '../../atoms/Button';
import { IButton } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { ButtonSize, ButtonVariant } from '../../atoms/Button/types/types';
import { ColorType, IconName } from '../../atoms/Icon/types/types';

import './buttonIcon.scss';

interface IButtonIcon extends Omit<IButton, 'size' | 'variant' | 'children'> {
  iconName: IconName;
  color?: ColorType;
  arialabel?: string;
}

export const ButtonIcon: React.FC<IButtonIcon> = ({
  iconName,
  type,
  color,
  isDisabled,
  className,
  arialabel,
  onClick,
}) => {
  return (
    <Button
      type={type}
      size={ButtonSize.small}
      isDisabled={isDisabled}
      onClick={onClick}
      className={className}
      variant={ButtonVariant.icon}
      arialabel={arialabel}
    >
      <Icon name={iconName} color={color} className="button__icon" />
    </Button>
  );
};
