import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/home/Dashboard';
// import AuthProvider from './utils/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import 'rsuite/Sidenav/styles/index.css';
import 'rsuite/Nav/styles/index.css';
import 'rsuite/dist/rsuite.min.css';
import 'rsuite/InputPicker/styles/index.css';
import Tickets from './pages/home/Tickets';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material/styles'; // Assuming you're using Material-UI


const secondaryColorOptions: PaletteColorOptions = {
    main: '#731916',
};

const primaryColorOptions: PaletteColorOptions = {
    main: '#ED1B3B',
};

const theme = createTheme({
    palette: {
        primary: primaryColorOptions,
        secondary: secondaryColorOptions,
    },
});
const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
    {/* <AuthProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/Tickets" element={<PrivateRoute element={Tickets} />} />
          
        </Routes>
      </Router>
    {/* </AuthProvider> */}
    </ThemeProvider>
  );
};

export default App;
