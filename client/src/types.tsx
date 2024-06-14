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
  singlePlayerIndex: number;
  player1Index: number;
  player2Index: number;
  correct: (boolean | null)[];
  setSinglePlayerIndex: (index: number | ((prevIndex: number) => number)) => void;
  setPlayer1Index: (index: number | ((prevIndex: number) => number)) => void;
  setPlayer2Index: (index: number | ((prevIndex: number) => number)) => void;
  setCorrect: (
    correct:
      | (boolean | null)[]
      | ((prev: (boolean | null)[]) => (boolean | null)[])
  ) => void;
  handleKeyDown: (e: React.KeyboardEvent, player: string | null) => void;
  undoLastKey: (player: string | null) => void;
  countErrors: () => number;
  calculateAccuracy: () => number;
  calculateWPM: (time: number) => number;
  startTimer: () => void;
  timeLeft: number;
  resetGame: (externalText?: string) => void;
  activeGame: boolean;
  setActiveGame: (active: boolean) => void;
  setMode: (mode: "single" | "versus") => void;
  mode: "single" | "versus";
}

export interface DisplayResultsProps {
  accuracy: number;
  wpm: number;
  errors: number;
  time: number;
}