import { makeAutoObservable, runInAction } from 'mobx';
import { IUserListItem } from '../components/molecules/UserListItem';
import { RootStore } from './RootStore';
import { LOADING_STATE } from './types/types';

export class UserListStore {
  rootStore: RootStore;
  userList: IUserListItem[] = [];

  loadingState: LOADING_STATE = LOADING_STATE.NEVER;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  clearUserListStore(): void {
    this.userList = [];
    this.loadingState = LOADING_STATE.NEVER;
  }

  setUserList(userList: IUserListItem[]): void {
    const currentUsername = this.rootStore.userStore.userInfo.username;

    const excludedCurrentUserUserList = userList.filter(
      (item: { name: string; gender: string }) => item.name !== currentUsername
    );

    runInAction(() => {
      this.userList = excludedCurrentUserUserList;
      this.loadingState = LOADING_STATE.LOADED;
    });
  }

  updateUserList(user: IUserListItem): void {
    const currentUsername = this.rootStore.userStore.userInfo.username;

    runInAction(() => {
      if (currentUsername !== user.name && !this.userList.find((item) => item.name === user.name)) {
        this.userList.push(user);
      }
    });
  }
}
