import { Action, TextUpdate } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export class SignalRService {
  private signalRConnection?: HubConnection;

  constructor(private username: string, private dispatch: React.Dispatch<Action>) {}

  createGameConnection() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    this.signalRConnection = new HubConnectionBuilder()
      .withUrl("/versus", {
        accessTokenFactory: () => token || ""
      })
      .withAutomaticReconnect()
      .build();

    this.signalRConnection
      .start()
      .then(() => console.log("SignalR connection established"))
      .catch((error) => console.error("SignalR connection error:", error));

    this.signalRConnection.on('UserConnected', () => {
      console.log('Connection established');
    });

    this.signalRConnection.on('GameText', (player1, player2, content) => {
      console.log(`Game started between ${player1} and ${player2}`);
      console.log('Game content:', content);
      this.dispatch({ type: 'GAME_STARTED', payload: { player1, player2, content } });
    });

    this.signalRConnection.on('ReceiveUpdate', (update: TextUpdate) => {
      console.log('Received update:', update);
      this.dispatch({ type: 'RECEIVE_UPDATE', payload: update });
    });

    this.signalRConnection.on('GameEnded', () => {
      console.log('Game ended');
    });
  }


  sendUpdate(sender: string, receiver: string, arr: (boolean | null)[], active: boolean) {
    if (this.signalRConnection) {
      this.signalRConnection.invoke('InGameUpdate', sender, receiver, arr, active)
        .catch((error) => console.log(error));
    }
  }

  endGame() {
    if (this.signalRConnection) {
      this.signalRConnection.invoke('EndGame')
        .catch((error) => console.log(error));
    }
  }

  getConnection() {
    return this.signalRConnection;
  }

}