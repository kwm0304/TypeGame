import { useEffect, useState } from 'react';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { useAuth } from '@/context/AuthContext';

const useSignalRConnection = (url: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("token: ", token)
    const newConnection = new HubConnectionBuilder()
      .withUrl(url, {
        accessTokenFactory: () => token || "" // Assuming user object has a token
      })
      .configureLogging(LogLevel.Information)
      .build();

    newConnection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
        if (user) {
          newConnection.invoke("AddPlayerToQueue", user.userName)
            .catch(err => console.log('Error adding player to queue: ', err));
        }
      })
      .catch(err => console.log('Error connecting to SignalR hub: ', err));

    setConnection(newConnection);

    return () => {
      newConnection.stop().then(() => console.log('Disconnected from SignalR hub'));
    };
  }, [url, user]);

  return connection;
};

export default useSignalRConnection;