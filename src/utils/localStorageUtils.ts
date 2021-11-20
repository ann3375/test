import { DialogType } from '../store/types/types';

class LocalStorageUtils {
  private accessToken = 'accessToken';
  private dialogs = 'dialogs';

  clearAcessToken(): void {
    localStorage.removeItem(this.accessToken);
  }

  clearDialogs(): void {
    localStorage.removeItem(this.dialogs);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  getDialogsInfo(): DialogType[] | null {
    const dialogs = localStorage.getItem(this.dialogs);
    if (dialogs) {
      return JSON.parse(dialogs);
    }
    return null;
  }

  setAccessToken(token: string): void {
    return localStorage.setItem(this.accessToken, token);
  }

  setDialogsInfo(dialog: DialogType, id: string): void {
    const dialogs = this.getDialogsInfo();

    if (dialogs) {
      const currentDialog = dialogs.find((dialog) => dialog.dialogId === id);

      if (!currentDialog?.dialogId) {
        return localStorage.setItem(this.dialogs, JSON.stringify([...dialogs, dialog]));
      }
      if (currentDialog?.dialogId) {
        const updatedDialogs = [
          ...dialogs.map((d) => {
            if (d.dialogId === id) {
              return (d = dialog);
            }
            return d;
          }),
        ];
        return localStorage.setItem(this.dialogs, JSON.stringify(updatedDialogs));
      }
    }

    localStorage.setItem(this.dialogs, JSON.stringify([dialog]));
  }
}

export const localStorageUtils = new LocalStorageUtils();
