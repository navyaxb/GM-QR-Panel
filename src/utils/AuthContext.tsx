import React, { createContext, useState, ReactNode, FC } from 'react';
// import { loginUser } from './services/apiService';

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (username: string, password: string, callback: () => void) => void;
//   logout: () => void;
// }

// const defaultAuthContext: AuthContextType = {
//   isAuthenticated: false,
//   login: () => { },
//   logout: () => { },
// };

// export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true);

//   const login = async (username: string, password: string, callback: () => void) => {
//     const data = {
//       "web_user_role": "admin",
//       "web_username": username,
//       "web_password": password
//     }
//     const response = await loginUser(data)
//     if (response && response.data.code === 200) {
//       setIsAuthenticated(true);
//       sessionStorage.setItem('loginData', JSON.stringify(response.data.results.data.web_user_data));
//       callback();
//     } else {
//       setIsAuthenticated(true);
//       alert('Invalid credentials');
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
