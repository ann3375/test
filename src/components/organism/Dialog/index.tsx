import React, { useEffect, useRef } from 'react';
import { Wrapper } from '../../atoms/Wrapper';
import { Typography } from '../../atoms/Typography';
import { DialogMessage } from '../../molecules/DialogMessage';
import { MessageType } from '../../../store/types/types';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { ColorType } from '../../atoms/Icon/types/types';

import './dialog.scss';

interface IDialog {
  dialogMessages: MessageType[] | undefined;
  currentUsername: string;
}

export const Dialog: React.FC<IDialog> = ({ currentUsername, dialogMessages }) => {
  const messageBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: messageBlock } = messageBlockRef;

    if (messageBlock) {
      messageBlock.scroll(0, messageBlock.scrollHeight);
    }
  }, [dialogMessages?.length]);

  return (
    <>
      {dialogMessages?.length ? (
        <Wrapper className="messages-area" refBlock={messageBlockRef}>
          {dialogMessages.map((message) => (
            <DialogMessage
              message={message}
              isCurrentUserMessage={message.fromUser === currentUsername}
              key={message.createdAt}
            />
          ))}
        </Wrapper>
      ) : (
        <Wrapper className="messages-area__no-messages-block">
          <Typography variant={TypographyTypeStyle.h4} color={ColorType.primary}>
            Сообщений пока нет...
          </Typography>
        </Wrapper>
      )}
    </>
  );
};
