import { useEffect, useState } from 'react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

const useSignalRConnection = (url: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch(err => console.log('Error connecting to SignalR hub: ', err));

    setConnection(newConnection);

    return () => {
      newConnection.stop().then(() => console.log('Disconnected from SignalR hub'));
    };
  }, [url]);

  return connection;
};

export default useSignalRConnection;
