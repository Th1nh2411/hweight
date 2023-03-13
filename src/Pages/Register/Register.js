import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import { FaFemale, FaMale } from 'react-icons/fa';
import * as registerService from '../../services/registerService';

const cx = classNames.bind(styles);
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [gender, setGender] = useState('1');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

        const postApi = async () => {
            const results = await registerService.register({ username, password, name, gender });
            console.log(results);
        };
        postApi();
        navigate(config.routes.dairy);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
        if (password.length < 6) {
            setErrorMessage('Password must have at least 6 characters');
            return;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-wrapper')}>
                <img src={images.running} className={cx('bg-img')} alt="bg-img" />
                <div className={cx('slogan')}>Keep your body clean. Stay off the nicotine.</div>
            </div>
            <div className={cx('form-wrapper')}>
                <div className={cx('form-container')}>
                    <img src={images.logo} className={cx('logo')} alt="logo-img" />
                    <div className={cx('form-title')}>Sign up to manage your BMI and have a healthy weight.</div>

                    <form onSubmit={handleSubmit} className={cx('form-body')}>
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', name ? 'hasValue' : '')}
                                type="text"
                                required
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                            <p>Your Full Name</p>
                            <span>
                                <i />
                            </span>
                        </div>
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', username ? 'hasValue' : '')}
                                type="email"
                                required
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                }}
                            />
                            <p>Your Email</p>
                            <span>
                                <i />
                            </span>
                        </div>
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', {
                                    hasValue: password,
                                    error: password.length < 6 && password.length !== 0,
                                })}
                                type="password"
                                required
                                value={password}
                                onChange={handleOnChangePassword}
                            />
                            <p>Password</p>
                            <span>
                                <i />
                            </span>
                        </div>
                        {password.length < 6 && password.length !== 0 && (
                            <div className={cx('error-message')}>{errorMessage}</div>
                        )}
                        <div className={cx('gender-button-container')}>
                            <label className={cx('gender-button', gender === '1' && 'selected')}>
                                <FaMale className={cx('gender-icon')} />
                                <input type="radio" name="gender" value={1} onChange={handleGenderChange} />
                                Male
                            </label>
                            <label className={cx('gender-button', gender === '0' && 'selected')}>
                                <FaFemale className={cx('gender-icon')} />
                                <input type="radio" name="gender" value={0} onChange={handleGenderChange} />
                                Female
                            </label>
                        </div>
                        <Button className={cx('custom-btn')} primary type="submit">
                            Sign Up
                        </Button>
                    </form>
                </div>
                <div className={cx('sign-up')}>
                    Already have an account?
                    <Link to={config.routes.login} className={cx('sign-up-label')}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
