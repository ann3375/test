import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import { Button } from '../../components/atoms/Button';
import { Dialog } from '../../components/organism/Dialog';
import { Header } from '../../components/organism/Header';
import { MessageForm } from '../../components/organism/MessageForm';
import { StatusBar } from '../../components/organism/StatusBar';
import { UserList } from '../../components/organism/UserList';
import { UserGender } from '../../components/atoms/Avatar/types/types';
import { Modal } from '../../components/organism/Modal';
import { Spinner } from '../../components/molecules/Spinner';
import { ChatPageTemplate } from '../../components/templates/ChatPageTemplate';
import { RootStoreContext } from '../../store/RootStore';
import { LOADING_STATE, MessageType } from '../../store/types/types';
import { ButtonType, ButtonVariant } from '../../components/atoms/Button/types/types';
import { useWebsocket } from '../../hooks/useWebsocket';
import { SCREENS } from '../../router/endpoints';

type ParamsType = {
  id: string | undefined;
};

export const ChatPage = observer((): React.ReactElement => {
  const [isVisibleUserList, setIsVisibleUserList] = useState<boolean>(false);
  const params = useParams<ParamsType>();
  const history = useHistory();
  const [wsState, WSAction] = useWebsocket('general_channel');
  const {
    userListStore,
    dialogStore,
    userStore: {
      userInfo: { username: currentUsername, gender: currentUserGender },
    },
  } = useContext(RootStoreContext);

  const messages = dialogStore.getDialogInfo(dialogStore.currentDialogId);

  const handleVisibleUserList = React.useCallback(() => {
    setIsVisibleUserList(!isVisibleUserList);
  }, [isVisibleUserList]);

  const setDialogInfo = React.useCallback(
    (username: string, lastseen: string, gender: UserGender) => {
      const currentDialogId = [currentUsername, username].sort().toString();
      dialogStore.setCurrentDialogInfo(username, lastseen, currentDialogId, gender);
    },

    [dialogStore, currentUsername]
  );

  const getLastMessage = React.useCallback(
    (id: string): MessageType | undefined => {
      const currentDialogId = [currentUsername, id].sort().toString();
      const messages = dialogStore.getDialogInfo(currentDialogId);

      if (messages) {
        return messages.dialogMessages[messages.dialogMessages?.length - 1];
      }
    },
    [currentUsername, dialogStore]
  );

  useEffect(() => {
    const { id } = params;
    if (id && userListStore.loadingState === LOADING_STATE.LOADED) {
      const currentCompanion = userListStore.userList.find(
        (user) => user.name === id.slice(0, id.lastIndexOf('_'))
      );
      currentCompanion?.name
        ? setDialogInfo(currentCompanion.name, 'Last seen recently', currentCompanion.gender)
        : history.push(SCREENS.SCREEN_DIALOGS);
    }
  }, [params, setDialogInfo, history, userListStore.loadingState, userListStore.userList]);

  useEffect(() => {
    if (wsState.isOpen) {
      WSAction.fetchUserData();
      WSAction.fetchUserList();
      dialogStore.setDialogList();
    }
  }, [WSAction, wsState.isOpen, dialogStore]);

  useEffect(() => {
    if (wsState.isOpen && currentUsername) {
      WSAction.sendUserJoinedInfo(currentUsername, currentUserGender);
    }
  }, [WSAction, wsState.isOpen, currentUsername, currentUserGender]);

  return (
    <>
      <ChatPageTemplate
        isLoadedDialogInfo={userListStore.loadingState === 'LOADED'}
        errorModal={wsState.error ? <Modal isError notificationText={wsState.error} /> : undefined}
        header={<Header isChatPage />}
        userList={
          <UserList
            getLastMessage={getLastMessage}
            setDialogInfo={setDialogInfo}
            users={userListStore.userList}
            isLoaded={userListStore.loadingState === LOADING_STATE.LOADED}
            handleVisibleUserList={handleVisibleUserList}
            isVisibleUserList={isVisibleUserList}
          />
        }
        statusBar={
          <StatusBar
            isVisibleUserList={isVisibleUserList}
            handleVisibleUserList={handleVisibleUserList}
            dialogInfo={dialogStore.currentDialogInfo.companion}
          />
        }
        dialog={
          <Dialog dialogMessages={messages?.dialogMessages} currentUsername={currentUsername} />
        }
        messageForm={
          <MessageForm
            dialogStore={dialogStore}
            currentUsername={currentUsername}
            WSAction={WSAction}
            isFileLoading={dialogStore.loadingState === LOADING_STATE.PENDING}
          />
        }
        spinner={<Spinner />}
        notificationButton={
          <Button
            variant={ButtonVariant.notification}
            type={ButtonType.button}
            className="chat-page__button_notification"
            onClick={handleVisibleUserList}
          >
            Select a chat to start messaging
          </Button>
        }
      />
    </>
  );
});
