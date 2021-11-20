import React from 'react';
import classNames from 'classnames';
import { Label } from '../../atoms/Label';
import { InputId, InputType } from '../FormInput/types/types';
import { IconName } from '../../atoms/Icon/types/types';
import { Icon } from '../../atoms/Icon';
import { Wrapper } from '../../atoms/Wrapper';

import './fileInput.scss';

interface IFileInput {
  id: InputId;
  uniqueKey: number;
  errorText: string | undefined;
  className: string;
  field: {
    name: string;
    onBlur: () => void;
    onChange: (e: File) => void;
    value: { filename: string };
  };
  handleFileInputChange: (
    event: { target: HTMLInputElement },
    onChangeHandler: (e: File) => void
  ) => void;
}

export const FileInput: React.FC<IFileInput> = ({
  id,
  field,
  uniqueKey,
  errorText,
  className,
  handleFileInputChange,
}): React.ReactElement => {
  const classProps = classNames('file-input', {
    [`${className}`]: className,
  });

  return (
    <Wrapper className={classProps}>
      <Label htmlFor={InputId.files} className="file-input__label">
        <Icon name={IconName.addFile} className="file-input__icon" />
        <input
          type={InputType.file}
          key={uniqueKey}
          id={id}
          {...field}
          value={field.value.filename}
          onChange={(event) => {
            handleFileInputChange(event, field.onChange);
          }}
        />
      </Label>
      <Label errorText={errorText} className="file-input__label_error" />
    </Wrapper>
  );
};
