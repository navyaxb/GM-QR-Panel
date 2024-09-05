import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, ButtonToolbar, Container, Button, Schema } from 'rsuite';
import loginImage from '../../assets/contactus.png';
import logo from '../../assets/logo.png';
import { Heading, Text, Footer } from 'rsuite';
import './Auth.css';

const { StringType } = Schema.Types;

const model = Schema.Model({
    vendorCode: StringType()
        .isRequired('Vendor Code is required')
        .pattern(/^V\d{5}$/, 'Invalid Vendor Code'),
    password: StringType().isRequired('Password is required')
});

interface FormValue {
    vendorCode: string;
    password: string;
}

interface FormError {
    vendoCode?: string;
    password?: string;
    login?: string;
}

const Login = () => {
    const formRef = useRef<any>(null);
    const [formError, setFormError] = useState<FormError>({});
    const [formValue, setFormValue] = useState<FormValue>({
        vendorCode: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (formRef.current && !formRef.current.check()) {
            return;
        }
        if (formValue.vendorCode === 'V02182' && formValue.password === 'Admin@123') {
            // Set authentication state in localStorage
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/dashboard');
        } else {
            setFormError({ login: 'Invalid credentials. Please try again.' });
        }
    };

    const handleChange = (value: Record<string, any>) => {
        setFormValue(value as FormValue);
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
                model={model}
                onSubmit={handleSubmit}
                onChange={handleChange}
                onCheck={(formError: FormError) => setFormError(formError)}
                formValue={formValue}
                formError={formError}
            >
                <Heading level={4}>Log In To Your Account.</Heading>
                <Text muted style={{ marginBottom: '20px' }}>Welcome back! Please enter your log in details.</Text>
                {formError.login && <Form.ErrorMessage style={{ marginBottom: '10px' }}>{formError.login}</Form.ErrorMessage>}
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
