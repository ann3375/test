import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Wrapper } from '../../atoms/Wrapper';
import { Typography } from '../../atoms/Typography';
import { ButtonIcon } from '../../molecules/ButtonIcon';
import { FileInput } from '../../molecules/FileInput';
import { FormInput } from '../../molecules/FormInput';
import { ButtonType } from '../../atoms/Button/types/types';
import { ColorType, IconName } from '../../atoms/Icon/types/types';
import { InputId, InputType } from '../../molecules/FormInput/types/types';
import { URL, HTTP_PORT } from '../../../services/contants';
import { FilePreview } from '../FilePreview';
import { useFileReader } from '../../../hooks/useFileReader';
import { validateFile } from '../../../utils/validateFile';
import { MessageType } from '../../../store/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { IFormInput, IMessageForm } from './types/types';

import './messageForm.scss';

const schema = yup.object().shape({
  messageText: yup.string(),
});

export const MessageForm: React.FC<IMessageForm> = ({
  WSAction,
  dialogStore,
  currentUsername,
  isFileLoading,
}) => {
  const [previewFileState, setPreviewFileState] = useFileReader();

  const message = useRef<MessageType>({
    text: '',
    fromUser: '',
    forUser: '',
    file: {
      fileLink: '',
      fileType: '',
      fileSize: 0,
      fileName: '',
    },
    createdAt: null,
  });

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    setError,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      messageText: '',
      files: [],
    },
  });

  const fileErrors = errors.files?.message || dialogStore.currentDialogError;

  const handleDeletePreviewFile = useCallback(() => {
    previewFileState.handleDeleteFile();
    previewFileState.handleResetUniqueKey();
    reset({ files: [] });
  }, [previewFileState, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();

    message.current = {
      text: data.messageText,
      fromUser: currentUsername,
      forUser: dialogStore.currentDialogInfo.companion.username,
      createdAt: Date.now(),
    };

    if (data.files?.name) {
      const { name: fileName, size: fileSize, type: fileType } = data.files;

      formData.append('0', data.files, data.files.name);
      const fileLink = await dialogStore.sendMessageFile<string>(formData, '/upload');

      if (fileLink) {
        message.current.file = {
          fileLink: `${URL}:${HTTP_PORT}${fileLink}`,
          fileType,
          fileSize,
          fileName,
        };
      }
    }

    if (message.current.text || message.current.file) {
      WSAction.sendMessage(`'${JSON.stringify(message.current)}'`);
    }
  };

  const handleFileInputChange = useCallback(
    (event: { target: HTMLInputElement }, onChangeHandler: (e: File) => void) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        if (validateFile(file).isValid) {
          setPreviewFileState(file);
          onChangeHandler(file);
        }

        validateFile(file).isSizeError &&
          setError('files', { type: 'fileError', message: 'Размер файла должен быть меньше 2 мб' });

        validateFile(file).isTypeError &&
          setError('files', { type: 'fileError', message: `Данный тип не поддерживается` });
      }
    },
    [setPreviewFileState, setError]
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      handleDeletePreviewFile();

      reset({ files: [], messageText: '' });
      message.current = {
        text: '',
        fromUser: '',
        forUser: '',
        createdAt: null,
      };
    }
  }, [isSubmitSuccessful, previewFileState, handleDeletePreviewFile, reset]);

  useEffect(() => {
    if (fileErrors) {
      () => previewFileState.handleResetUniqueKey();

      setTimeout(() => {
        clearErrors('files');
        dialogStore.clearError();
        previewFileState.handleResetUniqueKey();
      }, 1000);
    }
  }, [clearErrors, previewFileState, fileErrors, dialogStore]);

  return (
    <form className="message-form" onSubmit={handleSubmit(onSubmit)}>
      <Wrapper className="message-form__preview-block">
        <FilePreview
          previewFileState={previewFileState}
          handleDeletePreviewFile={handleDeletePreviewFile}
        />
      </Wrapper>

      {previewFileState.fileInfo.fileName && (
        <ButtonIcon
          className={classNames('message-form__preview-button', {
            'message-form__preview-button_active': !previewFileState.isVisiblePreviewFile,
          })}
          iconName={IconName.arrowDown}
          type={ButtonType.button}
          onClick={previewFileState.handleSetIsVisiblePreview}
        />
      )}

      <Wrapper flex align="center" className="message-form__inner">
        <Controller
          name={InputId.files}
          control={control}
          render={({ field }) => (
            <FileInput
              id={InputId.files}
              className="message-form__file-input"
              field={field}
              handleFileInputChange={handleFileInputChange}
              uniqueKey={previewFileState.uniqueKeyInput}
              errorText={fileErrors}
            />
          )}
        />

        <Controller
          name={InputId.messageText}
          control={control}
          render={({ field }) => (
            <FormInput placeholder="Write something..." type={InputType.textarea} field={field} />
          )}
        />

        <Typography
          variant={TypographyTypeStyle.span}
          className={classNames('message-form__tooltip', {
            'message-form__tooltip_active': isFileLoading,
          })}
        >
          Идет отправка файла...
        </Typography>

        <ButtonIcon
          iconName={isFileLoading ? IconName.spinnerCircle : IconName.sendMessage}
          type={ButtonType.submit}
          color={ColorType.primary}
          className="message-form__button"
          isDisabled={!isValid || isFileLoading}
        />
      </Wrapper>
    </form>
  );
};
