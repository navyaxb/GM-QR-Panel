import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, ButtonToolbar, Container, Button, Schema } from 'rsuite';
import loginImage from '../../assets/contactus.png';
import logo from '../../assets/logo.png';
import { Heading, Text, Footer } from 'rsuite';
import './Auth.css';

const { StringType } = Schema.Types;

const passwordModel = Schema.Model({
    vendorCode: StringType()
        .isRequired('Vendor Code is required')
        .pattern(/^V\d{5}$/, 'Invalid Vendor Code'),
    password: StringType().isRequired('Password is required')
});

const otpModel = Schema.Model({
    mobileNumber: StringType()
        .isRequired('Mobile number is required')
        .pattern(/^\d{10}$/, 'Invalid mobile number'),
    otp: StringType().isRequired('OTP is required')
});

interface PasswordFormValue {
    vendorCode: string;
    password: string;
}

interface OtpFormValue {
    mobileNumber: string;
    otp: string;
}

interface FormError {
    vendorCode?: string;
    password?: string;
    mobileNumber?: string;
    otp?: string;
    login?: string;
}

const Login = () => {
    const formRef = useRef<any>(null);
    const [formError, setFormError] = useState<FormError>({});
    const [passwordFormValue, setPasswordFormValue] = useState<PasswordFormValue>({
        vendorCode: '',
        password: ''
    });
    const [otpFormValue, setOtpFormValue] = useState<OtpFormValue>({
        mobileNumber: '',
        otp: ''
    });
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (formRef.current && !formRef.current.check()) {
            return;
        }
        if (isOtpLogin) {
            if (otpFormValue.mobileNumber.length === 10 && otpFormValue.otp === '0000') {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                setFormError({ login: 'Invalid OTP. Please try again.' });
            }
        } else {
            if (passwordFormValue.vendorCode === 'V02182' && passwordFormValue.password === 'Admin@123') {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                setFormError({ login: 'Invalid credentials. Please try again.' });
            }
        }
    };

    const handlePasswordChange = (value: Record<string, any>) => {
        setPasswordFormValue(value as PasswordFormValue);
    };

    const handleOtpChange = (value: Record<string, any>) => {
        setOtpFormValue(value as OtpFormValue);
    };

    const handleGetOtp = () => {
        if (otpFormValue.mobileNumber.length === 10) {
            setShowOtpInput(true);
        }
    };

    const toggleLoginMethod = () => {
        setIsOtpLogin(!isOtpLogin);
        setShowOtpInput(false);
        setFormError({});
    };

    const leftSide = () => (
        <div className='leftSide flex2'>
            <img className='image' src={loginImage} alt="Login" />
        </div>
    );

    const rightSide = () => (
        <div className='flex1 rightSide'>
            <img className='logo' src={logo} alt="Logo" />
            <Form 
                ref={formRef}
                className='formGroup'
                model={isOtpLogin ? otpModel : passwordModel}
                onSubmit={handleSubmit}
                onChange={isOtpLogin ? handleOtpChange : handlePasswordChange}
                onCheck={(formError: FormError) => setFormError(formError)}
                formValue={isOtpLogin ? otpFormValue : passwordFormValue}
                formError={formError}
            >
                <Heading level={4}>Log In To Your Account</Heading>
                <Text muted style={{ marginBottom: '20px' }}>Welcome back! Please enter your log in details.</Text>
                {formError.login && <Form.ErrorMessage style={{ marginBottom: '10px' }}>{formError.login}</Form.ErrorMessage>}
                
                {!isOtpLogin ? (
                    <>
                        <Form.Group controlId="vendorCode">
                            <Form.ControlLabel>Vendor Code</Form.ControlLabel>
                            <Form.Control name="vendorCode" />
                            <Form.HelpText>Vendor Code is required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.ControlLabel>Password</Form.ControlLabel>
                            <Form.Control 
                                name="password" 
                                type="password" 
                                autoComplete="off"
                            />
                        </Form.Group>
                        <div style={{ textAlign: 'right', marginTop: '5px', marginBottom: '15px' }}>
                            <Text muted style={{ cursor: 'pointer' }} onClick={toggleLoginMethod}>
                                Login with OTP
                            </Text>
                        </div>
                    </>
                ) : (
                    <>
                        <Form.Group controlId="mobileNumber">
                            <Form.ControlLabel>Mobile Number</Form.ControlLabel>
                            <Form.Control name="mobileNumber" />
                        </Form.Group>
                        {otpFormValue.mobileNumber.length === 10 && (
                            <Button appearance="primary" onClick={handleGetOtp} style={{ marginBottom: '10px' }}>
                                Get OTP
                            </Button>
                        )}
                        {showOtpInput && (
                            <Form.Group controlId="otp">
                                <Form.ControlLabel>OTP</Form.ControlLabel>
                                <Form.Control name="otp" />
                            </Form.Group>
                        )}
                        <div style={{ textAlign: 'right', marginTop: '5px', marginBottom: '15px' }}>
                            <Text muted style={{ cursor: 'pointer' }} onClick={toggleLoginMethod}>
                                Login with password
                            </Text>
                        </div>
                    </>
                )}
                
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" type="submit">
                            Login
                        </Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
    );

    const openEvolveBrands = () => {
        window.open('https://www.evolvebrands.com/', '_blank');
    };

    return (
        <Container className='loginScreen'>
            <div className='loginPage'>
                {leftSide()}
                {rightSide()}
            </div>
            <Footer className='footer'>
                <div className='footerTextContainer'>
                    <span className='footerText'>Copyright © 2024 | </span>
                    <span className='footerText footerTextLink' onClick={openEvolveBrands}> Evolve Brands Pvt. Ltd.</span>
                    <span className='footerText'>, All Rights Reserved</span>
                </div>
                <div className='footerTextContainer'>
                    <span className='footerText'>TERMS OF USE | PRIVACY POLICY</span>
                </div>
            </Footer>
        </Container>
    );
};

export default Login;