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

   

    return (
        <div className='dashboard'>
           
        </div>
    );
};

export default Dashboard; 