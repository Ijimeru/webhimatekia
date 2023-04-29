export interface User {
  username: string;
  email: string;
  nim: string;
}
export interface AuthTokensType {
  access: string | undefined;
  refresh: string | undefined;
}

export interface AuthContextType {
  user: User | null;
  authTokens: AuthTokensType | null;
  login: (email: string, password: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokensType | null>>;
  logout: () => void;
  setResendEmail: React.Dispatch<React.SetStateAction<string>>;
  resendEmail: string;
}
