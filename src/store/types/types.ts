import { FileInfoType } from '../../hooks/useFileReader';

export enum LOADING_STATE {
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
  PENDING = 'PENDING',
}

export type GendersListType = {
  id: string;
  gender: string;
};

export type MessageType = {
  text: string;
  fromUser: string;
  forUser: string;
  createdAt: number | null;
  file?: FileInfoType;
};

export type DialogType = {
  dialogId: string;
  dialogMessages: MessageType[];
};

export type CurrentDialogInfoType = {
  companion: {
    username: string;
    gender: string;
    lastSeen: string;
  };
};
