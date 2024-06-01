export interface Token { 
  userName: string; 
  email: string; 
  token: string; 
  userId: string 
} 

export interface SignUpFormProps { 
  Username: string; 
  Email: string; 
  Password: string; 
  Name: string 
} 

export interface LoginFormProps { 
  Username: string; 
  Password: string; 
}

export interface UserContextType { 
  user: UserProfile | null, 
    token: string | null, 
    register: (Email: string, Username: string, Password: string, Name:string) => void; 
    loginUser: (Username: string, Password: string) => void; 
    logout: () => void; 
    isLoggedIn: () => boolean;
    errMsg: string | null;
} 

export interface UserProfile  { 
  userName: string, 
  email: string, 
} 