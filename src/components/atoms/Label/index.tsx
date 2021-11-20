import React from 'react';
import classNames from 'classnames';

import './label.scss';

interface ILabel {
  htmlFor?: string;
  children?: React.ReactNode;
  labelText?: string;
  errorText?: string;
  className?: string;
}

export const Label: React.FC<ILabel> = ({ htmlFor, labelText, errorText, children, className }) => {
  const classProps = classNames('label', {
    [`${className}`]: className,
    [`label_notification_error`]: errorText,
  });

  return (
    <label htmlFor={htmlFor} className={classProps}>
      {errorText ? errorText : labelText}
      {children}
    </label>
  );
};
