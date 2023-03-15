import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FaFemale, FaMale } from 'react-icons/fa';
import * as profileService from '../../services/profileService';
import styles from './Profile.module.scss';
import Button from '../../components/Button';
import Toast from '../../components/Toast';

const cx = classNames.bind(styles);

function Profile() {
    const [profileData, setProfile] = useState({});
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePIValue, setChangePIValue] = useState(false);
    const [changeCPValue, setChangeCPValue] = useState();
    const [PISuccess, setPISuccess] = useState();
    const [CPSuccess, setCPSuccess] = useState();
    const getProfileData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.getProfile(token);
        setProfile(results);
        setHeight(results.height);
        setWeight(results.weight);
        setName(results.name);
        setGender(results.gender);
    };
    const handleUpdateProfileData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.updateProfile({ name, height, weight, gender }, token);
        setProfile(results);
        setChangePIValue(false);
    };
    useEffect(() => {
        getProfileData();
    }, []);
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
    const handleOnChangeGender = (event) => {
        if (event.target.value !== gender) {
        }
        setGender(event.target.value);
    };
    const handleCancelPI = () => {
        setHeight(profileData.height);
        setWeight(profileData.weight);
        setName(profileData.name);
        setGender(profileData.gender);
    };
    const handleSubmitUpdatePI = () => {
        handleUpdateProfileData();
        setPISuccess(true);
    };
    useEffect(() => {
        if (
            profileData.name !== name ||
            profileData.height !== height ||
            profileData.weight !== weight ||
            profileData.gender !== gender
        ) {
            setChangePIValue(true);
        } else {
            setChangePIValue(false);
        }
    }, [name, height, weight, gender]);

    // Change PW FORM
    useEffect(() => {
        if (currentPassword || newPassword || confirmPassword) {
            setChangeCPValue(true);
        } else {
            setChangeCPValue(false);
        }
    }, [currentPassword, newPassword, confirmPassword]);
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
    const handleOnChangeConfirmPw = (event) => {
        if (unaccentedCharacters(event.target.value)) {
            setConfirmPassword(event.target.value);
        }
    };

    const handleOnChangeNewPassword = (event) => {
        if (unaccentedCharacters(event.target.value)) {
            setNewPassword(event.target.value);
        }
    };
    const handleCancelCP = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleCPToastClose = () => {};
    const handlePIToastClose = () => {
        setPISuccess(false);
    };
    const handleSubmitCP = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.updateProfile({ password: newPassword }, token);

        if (false) {
            setCPSuccess(1);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setCPSuccess(0);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-item')}>
                <div className={cx('card-header')}>
                    <div className={cx('title')}>Personal Information</div>
                </div>
                <div className={cx('card-body')}>
                    <div className={cx('input-container')}>
                        <input
                            className={cx('form-input', name ? 'hasValue' : '')}
                            type="text"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setChangePIValue(true);
                            }}
                        />
                        <p>Your name</p>
                        <span>
                            <i />
                        </span>
                    </div>

                    <div className={cx('body-index')}>
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', height ? 'hasValue' : '')}
                                type="text"
                                value={height}
                                onChange={handleOnchangeHeight}
                            />
                            <p>Your height</p>
                            <div className={cx('unit')}>cm</div>
                            <span>
                                <i />
                            </span>
                        </div>
                        <div className={cx('input-container')}>
                            <input
                                className={cx('form-input', weight ? 'hasValue' : '')}
                                type="text"
                                value={weight}
                                onChange={handleOnchangeWeight}
                            />
                            <p>Your weight</p>
                            <div className={cx('unit')}>kg</div>
                            <span>
                                <i />
                            </span>
                        </div>
                    </div>
                    <div className={cx('gender-button-container')}>
                        <label className={cx('gender-button', gender === '1' && 'selected')}>
                            <FaMale className={cx('gender-icon')} />
                            <input
                                type="radio"
                                name="gender"
                                value={'1'}
                                checked={gender === 1}
                                onChange={handleOnChangeGender}
                            />
                            Male
                        </label>
                        <label className={cx('gender-button', gender === '0' && 'selected')}>
                            <FaFemale className={cx('gender-icon')} />
                            <input
                                type="radio"
                                name="gender"
                                value={'0'}
                                checked={gender === 0}
                                onChange={handleOnChangeGender}
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div className={cx('card-footer')}>
                    {changePIValue && (
                        <Button onClick={handleCancelPI} className={cx('custom-btn')}>
                            Cancel
                        </Button>
                    )}
                    <Button
                        onClick={handleSubmitUpdatePI}
                        disable={!changePIValue}
                        primary
                        className={cx('custom-btn')}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <div className={cx('card-item')}>
                <div className={cx('card-header')}>
                    <div className={cx('title')}>Change Password</div>
                </div>
                <div className={cx('card-body')}>
                    <div className={cx('input-container', { error: CPSuccess === 0 })}>
                        <input
                            className={cx('form-input', {
                                hasValue: currentPassword,
                            })}
                            type="password"
                            value={currentPassword}
                            onChange={(event) => {
                                if (unaccentedCharacters(event.target.value)) {
                                    setCurrentPassword(event.target.value);
                                    setCPSuccess();
                                }
                            }}
                        />
                        <p>Your current password</p>
                        <span>
                            <i />
                        </span>
                        {CPSuccess === 0 && (
                            <div className={cx('error-message')}>Incorrect current password. Please try again.</div>
                        )}
                    </div>

                    <div className={cx('input-container', { error: invalidPassword(newPassword) })}>
                        <input
                            className={cx('form-input', {
                                hasValue: newPassword,
                            })}
                            type="password"
                            value={newPassword}
                            onChange={handleOnChangeNewPassword}
                        />
                        <p>New password</p>
                        <span>
                            <i />
                        </span>
                        {invalidPassword(newPassword) && (
                            <div className={cx('error-message')}>Password must have at least 6 characters</div>
                        )}
                    </div>

                    <div
                        className={cx('input-container', {
                            error: !invalidPassword(newPassword) && invalidConfirmPw(confirmPassword),
                        })}
                    >
                        <input
                            className={cx('form-input', {
                                hasValue: confirmPassword,
                            })}
                            type="password"
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPw}
                            onFocus={() => {}}
                        />
                        <p>Confirm new password</p>
                        <span>
                            <i />
                        </span>
                        {!invalidPassword(newPassword) && invalidConfirmPw(confirmPassword) && (
                            <div className={cx('error-message')}>Password confirmation does not match</div>
                        )}
                    </div>
                </div>
                <div className={cx('card-footer')}>
                    {changeCPValue && (
                        <Button onClick={handleCancelCP} className={cx('custom-btn')}>
                            Cancel
                        </Button>
                    )}
                    <Button
                        onClick={handleSubmitCP}
                        disable={
                            invalidPassword(newPassword) ||
                            invalidConfirmPw(confirmPassword) ||
                            !confirmPassword ||
                            !newPassword ||
                            !currentPassword
                        }
                        primary
                        className={cx('custom-btn')}
                    >
                        Save
                    </Button>
                </div>
            </div>
            {PISuccess && (
                <Toast
                    title="Success"
                    content="Update personal information successfully"
                    type="success"
                    onClose={handlePIToastClose}
                />
            )}
            {CPSuccess === 1 ? (
                <Toast
                    title="Success"
                    content="Update password successfully"
                    type="success"
                    onClose={handleCPToastClose}
                />
            ) : CPSuccess === 0 ? (
                <Toast
                    title="Error"
                    content="The current password you entered is incorrect. Please try again."
                    type="error"
                    onClose={handleCPToastClose}
                    duration={7000}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default Profile;
