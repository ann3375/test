import { createContext } from 'react';
import { GenderListStore } from './genderListStore';
import { DialogStore } from './dialogStore';
import { UserListStore } from './userListStore';
import { UserStore } from './userStore';

export class RootStore {
  userStore = new UserStore(this);
  userListStore = new UserListStore(this);
  dialogStore = new DialogStore(this);
  genderListStore = new GenderListStore(this);

  constructor() {
    this.userStore = new UserStore(this);
    this.genderListStore = new GenderListStore(this);
    this.dialogStore = new DialogStore(this);
    this.genderListStore = new GenderListStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
