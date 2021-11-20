import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Wrapper } from '../../atoms/Wrapper';
import { Typography } from '../../atoms/Typography';
import { FileBlock } from '../FileBlock';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { MessageType } from '../../../store/types/types';

import './dialogMessage.scss';

interface IDialogMessage {
  isCurrentUserMessage: boolean;
  message: MessageType;
}

export const DialogMessage: React.FC<IDialogMessage> = ({ isCurrentUserMessage, message }) => {
  const classProps = classNames('message', {
    ['message_side_left']: !isCurrentUserMessage,
    ['message_side_right']: isCurrentUserMessage,
  });

  const { text: messageText, file } = message;

  const handleImageClick = useCallback((fileLink: string) => {
    window.open(fileLink);
  }, []);

  return (
    <Wrapper className={classProps}>
      {file && <FileBlock file={file} handleImageClick={handleImageClick} />}

      {messageText && (
        <Typography variant={TypographyTypeStyle.p1} className="message__text">
          {messageText}
        </Typography>
      )}
    </Wrapper>
  );
};
