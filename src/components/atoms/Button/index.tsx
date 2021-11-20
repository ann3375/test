import React from 'react';
import classNames from 'classnames';
import { ButtonSize, ButtonType, ButtonVariant } from './types/types';
import { NavLink } from 'react-router-dom';
import { SCREENS } from '../../../router/endpoints';

import './button.scss';

export interface IButton {
  type: ButtonType;
  children: React.ReactNode;
  isDisabled?: boolean;
  isNavLink?: boolean;
  path?: SCREENS;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  arialabel?: string;
  onClick?: () => void;
}

export const Button: React.FC<IButton> = ({
  children,
  type,
  isDisabled,
  variant,
  className,
  size,
  path,
  isNavLink,
  arialabel,
  onClick,
}) => {
  const classProps = classNames('button', {
    [`button_size_${size}`]: size,
    [`button_variant_${variant}`]: variant,
    [`${className}`]: className,
  });

  if (isNavLink && path) {
    return (
      <NavLink className={classProps} to={path}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={classProps}
      aria-label={arialabel}
    >
      {children}
    </button>
  );
};
