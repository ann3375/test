import { SUPPORTED_FORMATS } from '../components/organism/MessageForm/constants/constants';

export const validateFile = (
  file: File
): { isValid: boolean; isTypeError: boolean; isSizeError: boolean } => {
  const isSizeError = file.size >= 2 * 1024 * 1024;

  const isTypeError = ![
    ...SUPPORTED_FORMATS.VIDEO,
    ...SUPPORTED_FORMATS.AUDIO,
    ...SUPPORTED_FORMATS.IMAGE,
  ].includes(file.type);

  return {
    isValid: !isSizeError && !isTypeError,
    isTypeError,
    isSizeError,
  };
};
