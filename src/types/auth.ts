export interface User {
    id: number;
    username: string;
    name: string;
    role: 'ADMIN' | 'SELLER';
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
  }