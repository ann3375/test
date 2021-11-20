export type FetchGenderListResponse = {
  genders: {
    id: string;
    gender: string;
  }[];
};

export enum WebSocketMessageType {
  usersList = 'users_list',
  userData = 'user_data',
  sendMessage = 'send_message',
  sendUserJoinedInfo = 'user_joined',
  sendUserLogoutInfo = 'user_logout',
}

export interface IMessageToWS {
  (messageType: WebSocketMessageType, data?: Record<string, unknown>): void;
}

export interface IWSAction {
  fetchUserList: () => void;
  fetchUserData: () => void;
  sendMessage: (text: string) => void;
  sendUserJoinedInfo: (name: string, gender: string) => void;
}
