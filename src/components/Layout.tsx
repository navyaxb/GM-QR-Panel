import React, { FC, ReactNode } from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PageIcon from '@rsuite/icons/Page';
import BranchIcon from '@rsuite/icons/Branch';
import SpeakerIcon from '@rsuite/icons/Speaker';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';
import ExitIcon from '@rsuite/icons/Exit';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import PhoneIcon from '@rsuite/icons/Phone';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import QrcodeIcon from '@rsuite/icons/Qrcode';

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    const navigate = useNavigate();

    const headerStyles = {
        height: '30px'
    };

    const imageContainer = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '10px'
    };

    const headerText = {
        fontSize: '16px',
        fontWeight: '500',
        color: '#000',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    };

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('isAuthenticated');

        // Redirect to the login page
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{ width: '20vw', minWidth: '20vw', background: '#F7F7FA' }}>
                <Sidenav expanded={expanded} defaultOpenKeys={[]}>
                    <Sidenav.Body>
                        <Sidenav.Header>
                            <div style={imageContainer}>
                                <img style={headerStyles} src={logo} alt="Logo" />
                            </div>
                            <div style={headerText}>
                                GM Dhan Utsav
                            </div>
                        </Sidenav.Header>
                        <Nav
                            activeKey={activeKey}
                            onSelect={(key: any) => {
                                setActiveKey(key);
                                switch (key) {
                                    case '1': navigate('/dashboard'); break;
                                    case '2': navigate('/productionorder'); break;
                                    case '3': navigate('/generateqr'); break;
                                    case '4': navigate('/qr-history'); break;
                                    case '5': navigate('/contactus'); break;
                                    case '6': navigate('/aboutus'); break;
                                    case '10': handleLogout(); break;
                                    default: break;
                                }
                            }}
                        >
                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>Dashboard</Nav.Item>
                            
                            <Nav.Item eventKey="2" icon={<SpeakerIcon />}>Production Order</Nav.Item>
                            <Nav.Item eventKey="4" icon={<QrcodeIcon />}>QR History</Nav.Item>
                            <Nav.Item eventKey="5" icon={<PhoneIcon />}>Contact Us</Nav.Item>
                            <Nav.Item eventKey="6" icon={<InfoOutlineIcon />}>About Us</Nav.Item>
                            <Nav.Item eventKey="10" icon={<ExitIcon />}>Logout</Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
            <div style={{ width: '70vw', maxWidth: '80vw', flex: 1, padding: 0 }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
