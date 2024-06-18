export interface Token {
  userName: string;
  email: string;
  token: string;
  userId: string;
}

export interface SignUpFormProps {
  Username: string;
  Email: string;
  Password: string;
  Name: string;
}

export interface LoginFormProps {
  Username: string;
  Password: string;
}

export interface UserContextType {
  user: UserProfile | null;
  token: string | null;
  register: (
    Email: string,
    Username: string,
    Password: string,
    Name: string
  ) => void;
  loginUser: (Username: string, Password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  errMsg: string | null;
}

export interface UserProfile {
  userName: string;
  email: string;
  id: string;
}

export interface GameContextProps {
  text: string;
  currentIndex: number;
  correct: (boolean | null)[];
  setCorrect: (correct: (boolean | null)[]) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  undoLastKey: () => void;
  countErrors: () => number;
  calculateAccuracy: () => number;
  calculateWPM: (time: number) => number;
  startTimer: () => void;
  timeLeft: number;
  timerStarted: boolean;
  resetGame: () => void;
  activeGame: boolean;
  setActiveGame: (active: boolean) => void;
  setCurrentGameText: (text: string) => void;
  update: (boolean | null)[];
  setUpdate: (update: (boolean | null)[]) => void;
}

export interface TextUpdate {
  Sender: string;
  Receiver: string;
  Update: (boolean | null)[];
  IsGameActive: boolean;
}

export interface DisplayResultsProps {
  accuracy: number;
  wpm: number;
  errors: number;
  time: number;
}

export interface GameState {
  gameStarted: boolean;
  player1: string | null;
  player2: string | null;
  content: string;
  updates: Array<TextUpdate>;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: GameState = {
  gameStarted: false,
  player1: null,
  player2: null,
  content: "",
  updates: [],
};
