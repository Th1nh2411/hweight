import React, { useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '../../components/Button';

const cx = classNames.bind(styles);
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-wrapper')}>
                <img src={images.running} className={cx('bg-img')} />
            </div>
            <div className={cx('form-container')}>
                <img src={images.logo} className={cx('logo')} />
                <form onSubmit={handleSubmit} className={cx('form-body')}>
                    <div class={cx('input-container')}>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <p>Username</p>
                        <span>
                            <i />
                        </span>
                    </div>

                    <div class={cx('input-container')}>
                        <input
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
                    <Button primary type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
