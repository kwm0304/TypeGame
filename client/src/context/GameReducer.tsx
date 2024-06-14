import { GameState, Action, initialState, TextUpdate } from '../types'

export const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'GAME_STARTED':
      console.log('GAME_STARTED action payload:', action.payload);
      return {
        ...state,
        gameStarted: true,
        player1: action.payload.player1,
        player2: action.payload.player2,
        content: action.payload.content,
      };
    case 'RECEIVE_UPDATE':
      return {
        ...state,
        updates: [...state.updates, action.payload as TextUpdate],
      };
    case 'GAME_ENDED':
      return initialState;
    default:
      return state;
  }
};