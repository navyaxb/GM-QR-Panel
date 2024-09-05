import React, { useState, useEffect } from 'react';
import { Input, DatePicker, InputPicker } from 'rsuite';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import './Generateqr.css';

const GenerateQRCodeForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quantity, setQuantity] = useState('');
    const [qrType, setQrType] = useState(null); // State to manage QR Type selection

    useEffect(() => {
        if (!state || !state.itemCode) {
            navigate('/');  // Redirect if no item code is provided
        }
    }, [state, navigate]);

    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setMonth(expiryDate.getMonth() + 18);

    const handleSubmit = () => {
        if (quantity && qrType) {
            setTimeout(() => {
                navigate(`/qr-history/${state.itemCode}`);
            }, 3000); // Simulating delay
        }
    };

    const handleQuantityChange = (value: any) => {
        setQuantity(value);
    };

    const handleQrTypeChange = (value: any) => {
        setQrType(value);
    };

    const qrTypeData = [
        { label: 'Retailer', value: 'Retailer' },
        { label: 'Electrician', value: 'Electrician' },
        { label: 'Counter Salesman', value: 'Counter Salesman' },
    ];

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
                        <Input 
                            placeholder="Quantity" 
                            className="input-field" 
                            value={quantity} 
                            onChange={handleQuantityChange} 
                        />
                        <span style={{ color: 'red' }} className="error-text">This field is required.</span>
                    </div>

                    <div className="input-group">
                        <label className="input-label">QR Type</label>
                        <InputPicker
                            data={qrTypeData}
                            value={qrType}
                            onChange={handleQrTypeChange}
                            placeholder="Select QR Type"
                            className="input-field"
                        />
                        <span style={{ color: 'red' }} className="error-text">This field is required.</span>
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
                        <Input value="V02182" className="input-field" readOnly />
                    </div>
                </div>

                <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="input-group">
                        <label className="input-label">Serial Number Start</label>
                        <Input value="240500568010001" className="input-field"  readOnly/>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Serial Number End</label>
                        <Input value="240500568010010" className="input-field"  readOnly/>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Purchasing Order Number</label>
                        <Input value={state.purchasing_document} className="input-field" readOnly />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Expiry Date</label>
                        <DatePicker value={expiryDate} className="input-field" disabled />
                    </div>
                </div>
            </div>

            <div className="submit-button-container">
                <Button 
                    variant="contained" 
                    className="button" 
                    onClick={handleSubmit} 
                    disabled={!quantity || !qrType}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default GenerateQRCodeForm;
