import React, { useReducer, useEffect, useState, useRef } from 'react';
import { SignalRService } from '@/services/signalRService';
import { gameReducer } from '@/context/GameReducer';
import { useAuth } from '@/context/AuthContext';
import {  initialState, GameState, Action } from '@/types';

const Versus = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [state, dispatch] = useReducer<React.Reducer<GameState, Action>>(gameReducer, initialState);
  const signalRServiceRef = useRef<SignalRService | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
    }
  }, [user]);

  useEffect(() => {
    console.log('username', username)
    if (username) {
      
      signalRServiceRef.current = new SignalRService(username, dispatch);
      signalRServiceRef.current.createGameConnection();

      return () => {
        signalRServiceRef.current?.endGame();
      };
    }
  }, [username, dispatch]);
console.log("STATE: ", state)
  // const handleSendUpdate = (update: TextUpdate) => {
  //   signalRServiceRef.current?.sendUpdate(update);
  // };
//TODO: handleKeyDown will call handleSendUpdate
  return (
    <div>
      {state.gameStarted && (
        <>
       <p>Game started between {username} and {state.player2}</p>
       <div>{state.content}</div>
       </>
      )}
    </div>
  );
};

export default Versus;
