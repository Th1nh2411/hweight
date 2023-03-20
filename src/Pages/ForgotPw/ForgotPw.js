import React, { useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './ForgotPw.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as loginServices from '../../services/loginService';
import Input from '../../components/Input';
import Card from '../../components/Card';
const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();
    const [OTPMail, setOTPMail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);
    const unaccentedCharacters = (input) => {
        var regex = /^[a-zA-Z0-9]*$/;
        return regex.test(input);
    };
    const invalidPassword = (input) => {
        var regex = /^.{1,5}$/;

        return regex.test(input);
    };
    const invalidConfirmPw = (input) => {
        return input !== newPassword && input !== '';
    };
    const handleSubmitUsername = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await loginServices.getToken();
            console.log(results);
            if (results.success) {
                setOTPMail('');
                setStep(2);
                setErrorMessage('');
            } else {
                setOTPMail('');
                setErrorMessage("Account doesn't exist");
            }
        };
        getTokenApi();
    };
    const handleSubmitOTP = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await loginServices.getToken();
            console.log(results);
            if (results.success) {
                setOTPMail('');
                setStep(3);
                setErrorMessage('');
            } else {
                setOTPMail('');
                setErrorMessage('Wrong OTP code');
            }
        };
        getTokenApi();
    };
    const handleSubmitPassword = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await loginServices.getToken();
            console.log(results);
            navigate(config.routes.login);
        };
        getTokenApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-wrapper')}>
                <img src={images.account} className={cx('bg-img')} alt="bg-img" />
            </div>
            <div className={cx('form-wrapper')}>
                <Card className={cx('form-container')}>
                    <img src={images.logo} className={cx('logo')} alt="logo-img" />
                    <form
                        onSubmit={
                            step === 1 ? handleSubmitUsername : step === 2 ? handleSubmitOTP : handleSubmitPassword
                        }
                        className={cx('form-body')}
                    >
                        {step === 1 || step === 2 ? (
                            <Input
                                title={step === 1 ? 'Your Email' : 'OTP code'}
                                onChange={(event) => {
                                    setOTPMail(event.target.value);
                                    setErrorMessage();
                                }}
                                value={OTPMail}
                                errorCondition={errorMessage}
                                errorMessage={errorMessage}
                                type={step === 1 ? 'email' : 'text'}
                            />
                        ) : (
                            ''
                        )}
                        {step === 3 && (
                            <>
                                <Input
                                    onChange={(event) => {
                                        if (unaccentedCharacters(event.target.value)) {
                                            setNewPassword(event.target.value);
                                        }
                                    }}
                                    value={newPassword}
                                    title="New password"
                                    type="password"
                                    errorCondition={invalidPassword(newPassword)}
                                    errorMessage="Password must have at least 6 characters"
                                />

                                <Input
                                    title="Confirm Password"
                                    onChange={(event) => {
                                        if (unaccentedCharacters(event.target.value)) {
                                            setConfirmPassword(event.target.value);
                                        }
                                    }}
                                    value={confirmPassword}
                                    errorCondition={!invalidPassword(newPassword) && invalidConfirmPw(confirmPassword)}
                                    errorMessage="Password confirmation does not match"
                                    type="password"
                                />
                            </>
                        )}
                        <Button className={cx('custom-btn')} primary type="submit">
                            {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Change Password'}
                        </Button>

                        <Link to={config.routes.login} className={cx('login-option')}>
                            Sign In
                        </Link>
                    </form>
                </Card>
                <Card className={cx('sign-up')}>
                    Don't have an account?
                    <Link to={config.routes.register} className={cx('sign-up-label')}>
                        Sign Up
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Login;
