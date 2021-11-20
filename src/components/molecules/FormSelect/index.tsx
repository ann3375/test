import classNames from 'classnames';
import React, { useState } from 'react';
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import { Label } from '../../atoms/Label';
import { Typography } from '../../atoms/Typography';
import { Wrapper } from '../../atoms/Wrapper';
import { Icon } from '../../atoms/Icon';
import { ISignUpFormField } from '../../organism/SignUpForm';
import { ColorType, IconName } from '../../atoms/Icon/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { GendersListType } from '../../../store/types/types';

import './formSelect.scss';

interface IFormSelect {
  error: string | undefined;
  className: string;
  labelText: string;
  options: GendersListType[];
  setValue: UseFormSetValue<ISignUpFormField>;
  clearErrors: UseFormClearErrors<ISignUpFormField>;
}

export const FormSelect: React.FC<IFormSelect> = ({
  labelText,
  error,
  className,
  options,
  setValue,
  clearErrors,
}) => {
  const [isVisibleList, setIsVisibleList] = useState<boolean>(false);
  const [genderValue, setGenderValue] = useState<string>('');

  const classProps = classNames('select__list', {
    ' select__list_active': isVisibleList,
  });

  return (
    <Wrapper className="form-field">
      <Label labelText={labelText} className="form-field__label" />

      <Wrapper
        className={classNames('select', {
          ' select_notification_error': error,
          [`${className}`]: className,
        })}
        onClick={() => setIsVisibleList(!isVisibleList)}
      >
        <Typography
          variant={TypographyTypeStyle.p3}
          className="select__placeholder"
          color={genderValue ? undefined : ColorType.darkGrey}
        >
          {genderValue ? genderValue : 'Your gender'}
        </Typography>

        <Icon
          className={classNames(`select__button`, {
            ' select__button_active': isVisibleList,
          })}
          name={IconName.arrowDown}
          color={ColorType.primary}
        />

        <ul className={classProps}>
          {options.map((item) => (
            <li
              className="select__item"
              onClick={() => {
                setValue('gender', item.id, { shouldValidate: true });
                setGenderValue(item.gender);
                setIsVisibleList(!isVisibleList);
                clearErrors(['gender']);
              }}
              key={item.id}
            >
              <Typography variant={TypographyTypeStyle.p3}>{item.gender}</Typography>
            </li>
          ))}
        </ul>
      </Wrapper>

      {error && <Label errorText={error} className="form-field__label_notification_error" />}
    </Wrapper>
  );
};
