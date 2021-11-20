import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { RootStoreContext } from '../store/RootStore';
import { webSocketMessage, WS_API } from '../services/contants';
import { IWSAction, WebSocketMessageType } from '../services/types';

type Result<T> = T | undefined;

interface IWSState<T> {
  result: Result<T>;
  error: string;
  isOpen: boolean;
  isClosed: boolean;
}

export const useWebsocket = <T = Record<string, unknown>>(
  type: string
): [IWSState<T>, IWSAction] => {
  const { userStore, userListStore, dialogStore } = useContext(RootStoreContext);
  const ws = useRef<WebSocket | null>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<Result<T>>();
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const accessToken = userStore.tokens.accessToken;

  const params = `/?type=${type}&ws_id=`;

  useEffect(() => {
    if (accessToken) {
      ws.current = new WebSocket(`${WS_API}${params}${accessToken}`);
    }

    return () => {
      ws.current?.send('closed1');
      setIsClosed(true);
      ws.current?.close();
    };
  }, [accessToken, params]);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onopen = () => {
      setIsOpen(true);
    };

    ws.current.onerror = (event: Event) => {
      setError(event.type);
    };

    ws.current.onclose = () => {
      ws.current?.send('closed2');

      setIsClosed(true);
      ws.current?.close();
    };

    if (ws.current) {
      ws.current.onmessage = (event: MessageEvent) => {
        if (event.data.includes(`Get param 'ws_id' - is wrong! Please relogin!`)) {
          return setError(event.data);
        }

        const reverseData = event.data.replaceAll("'", '');
        const { type: eventType, ...wsResponse } = JSON.parse(reverseData);

        if (eventType === WebSocketMessageType.sendMessage) {
          dialogStore.updateCurrentDialogMessages(JSON.parse(wsResponse.data.message));
        }

        if (eventType === WebSocketMessageType.usersList) {
          userListStore.setUserList(wsResponse.data);
        }

        if (eventType === WebSocketMessageType.userData) {
          userStore.setCurrentUserInfo(wsResponse.data);
        }

        if (eventType === WebSocketMessageType.sendUserJoinedInfo) {
          if (!userListStore.userList.find((user) => user.name === wsResponse.data.name)) {
            userListStore.updateUserList(wsResponse.data);
          }
        }

        setResult(wsResponse.data);
      };
    }
  }, [userListStore, userStore, dialogStore]);

  const send = (messageType: WebSocketMessageType, data?: Record<string, unknown>) => {
    if (
      messageType === WebSocketMessageType.sendMessage ||
      messageType === WebSocketMessageType.sendUserJoinedInfo ||
      messageType === WebSocketMessageType.sendUserLogoutInfo
    ) {
      return ws.current?.send(`'${JSON.stringify({ type: messageType, data })}'`);
    }

    return ws.current?.send(JSON.stringify({ type: messageType, ...data }));
  };

  const WSAction = useMemo(() => {
    const fetchUserList = () => webSocketMessage.fetchUserList(send);
    const fetchUserData = () => webSocketMessage.fetchUserData(send);
    const sendMessage = (text: string) => webSocketMessage.sendMessage(send, text);
    const sendUserJoinedInfo = (username: string, gender: string) =>
      webSocketMessage.sendUserJoinedInfo(send, username, gender);

    return { fetchUserList, fetchUserData, sendMessage, sendUserJoinedInfo };
  }, []);

  return [{ isOpen, error, result, isClosed }, WSAction];
};
