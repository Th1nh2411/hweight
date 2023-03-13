import React, { useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './ForgotPw.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as loginServices from '../../services/loginService';

const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);

    const handleSubmitUsername = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await loginServices.getToken();
            console.log(results);
            if (results.success) {
                setInputValue('');
                setStep(2);
                setErrorMessage('');
            } else {
                setInputValue('');
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
                setInputValue('');
                setStep(3);
                setErrorMessage('');
            } else {
                setInputValue('');
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
            if (inputValue === confirmPassword) {
                navigate(config.routes.login);
            } else {
                setErrorMessage('Your password and confirmation password do not match');
            }
        };
        getTokenApi();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-wrapper')}>
                <img src={images.account} className={cx('bg-img')} alt="bg-img" />
            </div>
            <div className={cx('form-wrapper')}>
                <div className={cx('form-container')}>
                    <img src={images.logo} className={cx('logo')} alt="logo-img" />
                    <form
                        onSubmit={
                            step === 1 ? handleSubmitUsername : step === 2 ? handleSubmitOTP : handleSubmitPassword
                        }
                        className={cx('form-body')}
                    >
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', inputValue ? 'hasValue' : '')}
                                type={step === 1 ? 'email' : step === 2 ? 'text' : 'password'}
                                required
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                            <p>{step === 1 ? 'Your Email' : step === 2 ? 'OTP code' : 'New Password'}</p>
                            <span>
                                <i />
                            </span>
                        </div>
                        {step === 3 && (
                            <div className={cx('input-container')}>
                                <input
                                    className={cx('form-input', confirmPassword ? 'hasValue' : '')}
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                                <p>Confirm Password</p>
                                <span>
                                    <i />
                                </span>
                            </div>
                        )}
                        <Button className={cx('custom-btn')} primary type="submit">
                            {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Change Password'}
                        </Button>
                        <div className={cx('error-message')}>{errorMessage}</div>

                        <Link to={config.routes.login} className={cx('login-option')}>
                            Sign In
                        </Link>
                    </form>
                </div>
                <div className={cx('sign-up')}>
                    Don't have an account?
                    <Link to={config.routes.register} className={cx('sign-up-label')}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
