import { makeAutoObservable, runInAction } from 'mobx';
import { URL_API } from '../services/contants';
import { localStorageUtils } from '../utils/localStorageUtils';
import { RootStore } from './RootStore';
import { LOADING_STATE } from './types/types';

export type UserInfoType = {
  name: string;
  gender: string;
};

const accessToken = localStorageUtils.getAccessToken();

export class UserStore {
  rootStore: RootStore;
  userInfo = {
    username: '',
    gender: '',
    isUserAuthenticate: !!accessToken,
  };

  tokens = {
    accessToken: accessToken ? accessToken : '',
  };

  loadingState: LOADING_STATE = LOADING_STATE.NEVER;
  userAuthDataError = '';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setCurrentUserInfo(userInfo: UserInfoType): void {
    const { name: username, gender } = userInfo;

    this.userInfo = {
      username,
      gender,
      isUserAuthenticate: true,
    };
  }

  setAccessToken(accessToken: string): void {
    this.tokens = {
      accessToken,
    };
    this.userInfo.isUserAuthenticate = true;
    localStorageUtils.setAccessToken(accessToken);
  }

  clearUserInfo(): void {
    localStorageUtils.clearAcessToken();

    this.userInfo = {
      username: '',
      gender: '',
      isUserAuthenticate: false,
    };

    this.tokens.accessToken = '';
  }

  setError(error: string): void {
    this.userAuthDataError = error;
  }

  clearError(): void {
    this.userAuthDataError = '';
  }

  setLoadingState(loadingState: LOADING_STATE): void {
    this.loadingState = loadingState;
  }

  async sendUserAuthData<R>(userData: FormData, url: string): Promise<R | undefined> {
    this.loadingState = LOADING_STATE.PENDING;

    try {
      return await fetch(`${URL_API}${url}`, {
        method: 'POST',
        body: userData,
      }).then((response) => {
        if (response.status === 200) {
          if (this.userAuthDataError) {
            runInAction(() => {
              this.clearError();
            });
          }
          return response.json();
        } else {
          response.text().then((error) => {
            runInAction(() => {
              this.setError(error);
            });
          });
        }
      });
    } catch (e) {
      runInAction(() => {
        this.setError((e as Error).message);
      });
    } finally {
      this.loadingState = LOADING_STATE.LOADED;
    }
  }
}
