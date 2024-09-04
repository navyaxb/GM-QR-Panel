import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import '../../App.css';
import { userDashboardShowOverallData } from '../../utils/services/apiService';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import Divider from '@mui/material/Divider';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import Redeem from '@mui/icons-material/Redeem';
import { styled } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts';
import Stack from '@mui/material/Stack';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import points from '../../assets/icons/points.png'
import users from '../../assets/icons/users.png'
import totalred from '../../assets/icons/totalredemption.png'
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';    
const Dashboard = () => {
    const [data, setData] = useState({
        total_users_registered: 0,
        kyc_verified_users: 0,
        active_users: 0,
        deactive_users: 0,
        blocked_users: 0,
        unblocked_users: 0,
        login_approval_pending_users: 0,
        login_approved_users: 0,
        login_rejected_users: 0,
        welcome_points: 0,
        scanned_qr_code_points: 0,
        rewards_points: 0,
        redeemed_points: 0,
        balance_points: 0,
        number_of_qr_code_scanned: 0,
        yearly_registered_user: [],
        monthly_registered_user: [],
    });

    const [dateTime, setDateTime] = useState(new Date());
    const [loading, setLoading] = useState(true);


    const formatDateTime = (date: Date) => {
        return date.toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };
    const UserStatsGrid = () => (
        <div className='gridBox'>
            <div className='pointsRow'>
                <div className='greyContainer containerColor1'>
                    <div className='dashboardIcon' >
                        <DocumentScannerOutlinedIcon fontSize="medium" />
                    </div>
                    <div className='flexBox1'>
                        <h2>{data.kyc_verified_users}</h2>
                        <span>QR Codes Generated</span>
                        <div className='change'>+24% From Yesterday</div>
                    </div>
                </div>
                <div className='greyContainer containerColor2'>
                    <div className='dashboardIcon2'>
                        <ThreePOutlinedIcon fontSize="medium" />
                    </div>
                    <div className='flexBox1'>
                        <h2>{data.deactive_users}</h2>
                        <span>QR Codes Requested</span>
                        <div className='change'>+32% From Yesterday</div>
                    </div>
                </div>
            </div>
            <div className='pointsRow1'>
                <div className='greyContainer containerColor3'>
                    <div className='dashboardIcon3'>
                        <FileDownloadOutlinedIcon fontSize="medium" />
                    </div>
                    <div className='flexBox1'>
                        <h2>{data.active_users}</h2>
                        <span>QR codes Downloaded</span>
                        <div className='change'>+20% From Yesterday</div>
                    </div>
                </div>
                <div className='greyContainer containerColor4'>
                    <div className='dashboardIcon4'>
                    <PersonRemoveOutlinedIcon fontSize="medium" />
                    </div>
                    <div className='flexBox1'>
                        <h2>{data.blocked_users}</h2>
                        <span>GRN</span>
                        <div className='change'>+22% From Yesterday</div>
                    </div>

                </div>
            </div>

        </div>

    );
    const currentDate = new Date().toLocaleDateString();




    return (
        <div className='dashboard'>
            <div className='headerContainer'>
                <div className='header'>
                    <h2>Welcome Back, Ajay Kumar</h2>
                    <p className='grey-text'>Dashboard Overview</p>
                </div>
                <div>
                    <p className='grey-text'>{formatDateTime(dateTime)}</p>
                </div>
            </div>
            <Divider style={{ margin: '0 0 20px 0' }} />

            <div className='dashboard-content'>
                <UserStatsGrid />

            </div>

        </div>
    );
};

export default Dashboard; 