import React, { useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './ForgotPw.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as forgotPWService from '../../services/forgotPWService';
import Input from '../../components/Input';
import Card from '../../components/Card';
const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [verifyID, setVerifyID] = useState('');
    const [password, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
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
        return input !== password && input !== '';
    };
    const handleSubmitUsername = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await forgotPWService.mailForgot({ mail });
            if (results.isSuccess) {
                // setMail('');
                setStep(2);
                setErrorMessage('');
            } else {
                // setMail('');
                setErrorMessage("Account doesn't exist");
            }
        };
        getTokenApi();
    };
    const handleSubmitOTP = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await forgotPWService.verifyOTP({ verifyID, mail });
            if (results.isSuccess) {
                // setMail('');
                setStep(3);
                setErrorMessage('');
            } else {
                // setMail('');
                setErrorMessage('Wrong OTP code');
            }
        };
        getTokenApi();
    };
    const handleSubmitPassword = (event) => {
        event.preventDefault();
        const getTokenApi = async () => {
            const results = await forgotPWService.changePw({
                mail,
                password,
                repeatPassword,
            });
            if (results.isSuccess) {
                navigate(config.routes.login);
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
                                    step === 1 ? setMail(event.target.value) : setVerifyID(event.target.value);
                                    setErrorMessage();
                                }}
                                value={step === 1 ? mail : verifyID}
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
                                    value={password}
                                    title="New password"
                                    type="password"
                                    errorCondition={invalidPassword(password)}
                                    errorMessage="Password must have at least 6 characters"
                                />

                                <Input
                                    title="Confirm Password"
                                    onChange={(event) => {
                                        if (unaccentedCharacters(event.target.value)) {
                                            setRepeatPassword(event.target.value);
                                        }
                                    }}
                                    value={repeatPassword}
                                    errorCondition={!invalidPassword(password) && invalidConfirmPw(repeatPassword)}
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
