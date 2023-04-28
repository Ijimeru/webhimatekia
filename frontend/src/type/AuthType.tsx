export interface User {
  username: string;
  email: string;
  nim: string;
}
export interface AuthTokensType {
  access: string | undefined;
  refresh: string | undefined;
}
export interface MessageType {
  status: string;
  message: string;
}
export interface AuthContextType {
  user: User | null;
  authTokens: AuthTokensType | null;
  loginMessage: MessageType | null;
  login: (email: string, password: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokensType | null>>;
  logout: () => void;
}

export interface loginMessageType {
  status: string;
  message: string;
}
export interface AuthTypes {
  authTokens: AuthTokensType | null;
  user: User | null;
  loginMessage: loginMessageType | null;
}
