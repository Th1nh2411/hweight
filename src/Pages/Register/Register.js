import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import { FaFemale, FaMale } from 'react-icons/fa';
import * as loginServices from '../../services/loginService';
import * as registerService from '../../services/registerService';
import Input from '../../components/Input/Input';
import Card from '../../components/Card/Card';

const cx = classNames.bind(styles);
const Register = ({}) => {
    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('1');
    const [success, setSuccess] = useState(true);
    const onlyNumber = (input) => {
        var regex = /^\d*$/g;
        return regex.test(input);
    };
    const handleOnchangeWeight = (event) => {
        if (onlyNumber(event.target.value)) {
            setWeight(event.target.value);
        }
    };
    const handleOnchangeHeight = (event) => {
        if (onlyNumber(event.target.value)) {
            setHeight(event.target.value);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const createAccount = async () => {
            const results = await registerService.register({ mail, password, name, gender, weight, height });
            if (results.isSuccess) {
                localStorage.setItem('token', results.token);
                navigate(config.routes.login);
            } else {
                setSuccess(false);
            }
        };
        createAccount();
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('bg-wrapper')}>
                <img src={images.running} className={cx('bg-img')} alt="bg-img" />
                <div className={cx('slogan')}>Keep your body clean. Stay off the nicotine.</div>
            </div>
            <div className={cx('form-wrapper')}>
                <Card className={cx('form-container')}>
                    <img src={images.logo} className={cx('logo')} alt="logo-img" />
                    <div className={cx('form-title')}>Sign up to manage your BMI and have a healthy weight.</div>

                    <form onSubmit={handleSubmit} className={cx('form-body')}>
                        <Input
                            title="Your Full Name"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            value={name}
                        />
                        <Input
                            title="Your Email"
                            onChange={(event) => {
                                setMail(event.target.value);
                                setSuccess(true);
                            }}
                            value={mail}
                            type="email"
                            errorCondition={!success}
                            errorMessage="This email has been registered"
                        />
                        <Input
                            title="Password"
                            onChange={handleOnChangePassword}
                            value={password}
                            type="password"
                            errorCondition={password.length < 6 && password.length !== 0}
                            errorMessage="Password must have at least 6 characters"
                        />
                        <div className={cx('body-index')}>
                            <Input
                                onChange={handleOnchangeHeight}
                                value={height}
                                title="Your height"
                                type="text"
                                unit="cm"
                                className={cx('body-index-input')}
                            />
                            <Input
                                onChange={handleOnchangeWeight}
                                value={weight}
                                title="Your weight"
                                type="text"
                                unit="kg"
                                className={cx('body-index-input')}
                            />
                        </div>
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

                        <Button
                            disable={!password || !name || !height || !weight}
                            className={cx('custom-btn')}
                            primary
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                </Card>
                <Card className={cx('sign-up')}>
                    Already have an account?
                    <Link to={config.routes.login} className={cx('sign-up-label')}>
                        Sign In
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default Register;
