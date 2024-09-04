import React, { FC, ReactNode } from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import PageIcon from '@rsuite/icons/Page';
import BranchIcon from '@rsuite/icons/Branch';
import SpeakerIcon from '@rsuite/icons/Speaker';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';
import ExitIcon from '@rsuite/icons/Exit';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

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
                                    case '2': navigate('/Masters'); break;
                                    case '4': navigate('/Tickets'); break;
                                    case '5': navigate('/Testimonials'); break;
                                    case '10': handleLogout(); break;
                                    default: break;
                                }
                            }}
                        >
                            <Nav.Item eventKey="1" icon={<DashboardIcon />}>Dashboard</Nav.Item>
                            <Nav.Item eventKey="2" title="Masters" icon={<BranchIcon />}>Masters</Nav.Item>
                            <Nav.Menu placement="rightStart" eventKey="3" title="Reports" icon={<PageIcon />}>
                                <Nav.Item eventKey="3-1">Login Report</Nav.Item>
                                <Nav.Item eventKey="3-2">Registered User Report</Nav.Item>
                                <Nav.Item eventKey="3-3">QR Transaction Report</Nav.Item>
                                <Nav.Item eventKey="3-4">Points Report</Nav.Item>
                                <Nav.Item eventKey="3-5">Bank Details Report</Nav.Item>
                                <Nav.Item eventKey="3-6">OTP Report</Nav.Item>
                                <Nav.Item eventKey="3-7">KYC Report</Nav.Item>
                                <Nav.Item eventKey="3-8">Other Report</Nav.Item>
                            </Nav.Menu>
                            <Nav.Item eventKey="4" icon={<SpeakerIcon />}>Tickets</Nav.Item>
                            <Nav.Item eventKey="5" icon={<PublicOpinionIcon />}>Testimonials</Nav.Item>
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
