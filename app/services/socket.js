import io from 'socket.io-client';
import Config from 'react-native-config';

/* Socket.io events */
const CONNECT = 'connect';
const DISCONNECT = 'disconnect';
const CONNECT_ERR = 'connect_error';
const RECONNECT_ERR = 'reconnect_error';

/* Custom events */
const NOTIFY = 'notify';
export const RECEIVE_MESSAGE = 'message';
export const RECEIVE_INVITE = 'invite';
export const RECEIVE_NOTIFICATION = 'notification';

let socket;

const Socket = (props) => {
  const connect = (token = props.token, jwtHeader = props.jwtHeader) => {
    const { onSocketDisconnect, onSocketError } = props;
    const host = `${Config.HOST}?token=${token}`;

    socket = io.connect(host, {
      reconnect: true,
      transportOptions: {
        polling: { extraHeaders: { authorization: jwtHeader } },
      },
    });

    // Set listeners
    socket.on(CONNECT, handleConnectEvent);
    socket.on(DISCONNECT, onSocketDisconnect);
    socket.on(CONNECT_ERR, onSocketError);
    socket.on(RECONNECT_ERR, onSocketError);
  };

  const handleConnectEvent = () => {
    socket.on(NOTIFY, handleNotifications);
  };

  const handleNotifications = (payload) => {
    const { onReceiveMessage, onReceiveInvite, onReceiveNotification } = props;
    const { category } = payload;

    switch (category) {
      case RECEIVE_MESSAGE:
        onReceiveMessage(payload);
        break;
      case RECEIVE_INVITE:
        onReceiveInvite(payload);
        break;
      case RECEIVE_NOTIFICATION:
        onReceiveNotification(payload);
        break;
      default:
        break;
    }
  };

  const disconnect = () => {
    socket.close();
  };

  return {
    connect,
    disconnect,
  };
};

export default Socket;
