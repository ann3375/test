import { MessageType } from '../store/types/types';
import { SUPPORTED_FORMATS } from '../components/organism/MessageForm/constants/constants';

export const formatLastUserMessage = (lastMessage: MessageType | undefined): string | undefined => {
  const fileType = lastMessage?.file?.fileType;

  if (fileType) {
    if (SUPPORTED_FORMATS.VIDEO.includes(fileType)) {
      return `Video file`;
    }

    if (SUPPORTED_FORMATS.AUDIO.includes(fileType)) {
      return `Audio file`;
    }

    return `Image file`;
  }
  return lastMessage?.text;
};
