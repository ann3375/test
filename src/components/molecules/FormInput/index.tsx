import React from 'react';
import classNames from 'classnames';
import { Label } from '../../atoms/Label';
import { Wrapper } from '../../atoms/Wrapper';
import { Icon } from '../../atoms/Icon';
import { ColorType, IconName } from '../../atoms/Icon/types/types';
import { InputSize, InputType } from './types/types';

import './formInput.scss';

interface IFormInput {
  type: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  labelText?: string;
  errorText?: string;
  className?: string;
  size?: InputSize;
  isAvailableAutoComplete?: boolean;
  field: {
    name: string;
    onBlur: () => void;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  };
}

export const FormInput: React.FC<IFormInput> = ({
  type,
  placeholder = '',
  labelText,
  errorText,
  className,
  isRequired,
  isDisabled,
  size,
  field,
  isAvailableAutoComplete = true,
}) => {
  const classProps = classNames('form-field', {
    [`${className}`]: className,
    [`form-field_size_${size}`]: size,
  });

  const classPropsInput = classNames('form-field__input', {
    ['form-field__input_notification_error']: errorText,
  });

  return (
    <Wrapper className={classProps}>
      <Label htmlFor={field.name} labelText={labelText} className="form-field__label" />

      <Wrapper className="form-field__inner">
        {type === InputType.textarea ? (
          <textarea
            required={isRequired}
            className="form-field__textarea"
            placeholder={placeholder}
            id={field.name}
            {...field}
          />
        ) : (
          <input
            autoComplete={isAvailableAutoComplete ? 'on' : 'off'}
            className={classPropsInput}
            id={field.name}
            placeholder={placeholder}
            type={type}
            disabled={isDisabled}
            {...field}
          />
        )}

        {errorText && (
          <Icon className="form-field__icon" color={ColorType.error} name={IconName.inputError} />
        )}
      </Wrapper>

      {errorText && (
        <Label
          htmlFor={field.name}
          errorText={errorText}
          className="form-field__label_notification_error"
        />
      )}
    </Wrapper>
  );
};
