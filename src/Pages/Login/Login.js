import React, { useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as loginServices from '../../services/loginService';

const cx = classNames.bind(styles);
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const postApi = async () => {
            const results = await loginServices.login({ username, password });
            console.log(results);
        };
        postApi();
        const getTokenApi = async () => {
            const results = await loginServices.getToken();

            console.log(results);
            if (results.success) {
                localStorage.setItem('token', results.token);
                navigate(config.routes.dairy);
            } else {
                setUsername('');
                setPassword('');
                setErrorMessage('Password or username is incorrect');
            }
        };
        getTokenApi();
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

                    <form onSubmit={handleSubmit} className={cx('form-body')}>
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
                                className={cx('form-input', password ? 'hasValue' : '')}
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <p>Password</p>
                            <span>
                                <i />
                            </span>
                        </div>
                        <Button className={cx('custom-btn')} primary type="submit">
                            Sign In
                        </Button>
                        <div className={cx('error-message')}>{errorMessage}</div>
                        <Link to={config.routes.forgot} className={cx('forgot-pw')}>
                            Forgot password?
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
