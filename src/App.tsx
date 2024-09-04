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
import ProductionOrder from './pages/home/ProductionOrder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material/styles'; // Assuming you're using Material-UI
import ProductionOrderDetails from './pages/home/ProductionDetails';
import GenerateQRCodeForm from './pages/home/GenerateQR';
import AboutUs from './pages/home/AboutUs';
import ContactUs from './pages/home/ContactUs';
import QRHistory from './pages/home/QRHistory';

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
          <Route path="/productionorder" element={<PrivateRoute element={ProductionOrder} />} />
          <Route path="/production-order-details/:id" element={<PrivateRoute element={ProductionOrderDetails} />} />
          <Route path="/generateqr" element={<PrivateRoute element={GenerateQRCodeForm} />} />
          <Route path="/contactus" element={<PrivateRoute element={ContactUs} />} />
          <Route path="/aboutus" element={<PrivateRoute element={AboutUs} />} />
          <Route path="/qr-history/:itemCode" element={<PrivateRoute element={QRHistory} />} />
          <Route path="/qr-history" element={<PrivateRoute element={QRHistory} />} />
          
        </Routes>
      </Router>
    {/* </AuthProvider> */}
    </ThemeProvider>
  );
};

export default App;
