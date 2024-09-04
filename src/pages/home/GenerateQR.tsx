import React, { useState, useEffect } from 'react';
import { Input, DatePicker } from 'rsuite';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import './Generateqr.css';

const GenerateQRCodeForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (!state || !state.itemCode) {
            navigate('/');  // Redirect if no item code is provided
        }
    }, [state, navigate]);

    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setMonth(expiryDate.getMonth() + 18);

    const handleSubmit = () => {
        if (quantity) {
            setTimeout(() => {
                navigate(`/qr-history/${state.itemCode}`);
            }, 3000); // Simulating delay
        }
    };

    return (
        <div className="form-container">
            <h3 className="form-title">Generate QR Codes</h3>
            <p className="form-subtitle">Select Item code and details.</p>

            <div className="form-grid">
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">Item Code</label>
                        <Input value={state.itemCode} className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Quantity</label>
                        <Input placeholder="Quantity" className="input-field" value={quantity} onChange={setQuantity} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Manufacturing Date</label>
                        <DatePicker value={currentDate} className="input-field" disabled />
                    </div>
                </div>

                <div className="form-row" style={{ marginTop: '30px' }}>
                    <div className="input-group">
                        <label className="input-label">Description</label>
                        <Input value={state.item_desciption} className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">EAN Code</label>
                        <Input value={state.ean_code} className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">UOM</label>
                        <Input value="Single" className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Manufacturing Location</label>
                        <Input value="01" className="input-field" readOnly />
                    </div>
                </div>

                <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="input-group">
                        <label className="input-label">Serial Number Start</label>
                        <Input placeholder="Serial Number Start" className="input-field" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Serial Number End</label>
                        <Input placeholder="Serial Number End" className="input-field" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Order Number</label>
                        <Input value={state.purchasing_document} className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Expiry Date</label>
                        <DatePicker value={expiryDate} className="input-field" disabled />
                    </div>
                </div>
            </div>

            <div className="submit-button-container">
                <Button variant="contained" className="button" onClick={handleSubmit} disabled={!quantity}>
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default GenerateQRCodeForm;
