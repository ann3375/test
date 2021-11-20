import { IWSAction } from '../../../../services/types';
import { CurrentDialogInfoType, DialogType, LOADING_STATE } from '../../../../store/types/types';

export interface IMessageForm {
  WSAction: IWSAction;
  dialogStore: {
    dialogsList: DialogType[];
    currentDialogInfo: CurrentDialogInfoType;
    currentDialogId: string;
    currentDialogError: string;
    loadingState: LOADING_STATE;
    clearError: () => void;
    sendMessageFile: <R>(files: FormData, url: string) => Promise<string | R | undefined>;
  };
  isFileLoading: boolean;
  currentUsername: string;
}

export interface IFormInput {
  messageText: string;
  files: File;
}
