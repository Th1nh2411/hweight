import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaFemale, FaMale, FaRegUserCircle } from 'react-icons/fa';
import * as profileService from '../../services/profileService';
import styles from './Profile.module.scss';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { RiLockPasswordFill } from 'react-icons/ri';
import UserContext from '../../store/Context';
import { actions } from '../../store';
const cx = classNames.bind(styles);

function Profile() {
    const [state, dispatch] = useContext(UserContext);

    const [profileData, setProfile] = useState({});
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState(1);
    const [isShare, setIsShare] = useState(0);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [changePIValue, setChangePIValue] = useState(false);
    const [changeCPValue, setChangeCPValue] = useState();
    const [PISuccess, setPISuccess] = useState();
    const [CPSuccess, setCPSuccess] = useState();
    const [getDataSuccess, setGetDataSuccess] = useState(false);

    const handleUpdateProfileData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.updateProfile({ name, height, weight, gender, isShare }, token);
        setProfile({ name, height, weight, gender, isShare });
        dispatch(actions.setUserInfo({ name, height, weight, gender, isShare }));
        setChangePIValue(false);
    };
    useEffect(() => {
        const getProfileData = async () => {
            const token = localStorage.getItem('token');
            const results = await profileService.getProfile(token);
            if (results) {
                setProfile(results);
                setHeight(results.height);
                setWeight(results.weight);
                setName(results.name);
                setGender(results.gender);
                setIsShare(results.isShare);
                setGetDataSuccess(true);
            }
        };
        getProfileData();
    }, []);
    const onlyNumber = (input) => {
        var regex = /^\d*$/g;
        return regex.test(input);
    };

    const handleOnchangeWeight = (event) => {
        if (onlyNumber(event.target.value)) {
            setWeight(event.target.value ? parseInt(event.target.value) : '');
        }
    };
    const handleOnchangeHeight = (event) => {
        if (onlyNumber(event.target.value)) {
            setHeight(event.target.value ? parseInt(event.target.value) : '');
        }
    };
    const handleOnChangeGender = (event) => {
        if (event.target.value !== gender) {
            setGender(parseInt(event.target.value));
        }
    };
    const handleCancelPI = () => {
        setHeight(profileData.height);
        setWeight(profileData.weight);
        setName(profileData.name);
        setGender(profileData.gender);
        setIsShare(profileData.isShare);
    };

    const handleSubmitUpdatePI = () => {
        handleUpdateProfileData();
        setPISuccess(true);
    };
    useEffect(() => {
        if (getDataSuccess) {
            if (
                profileData.name !== name ||
                profileData.height !== height ||
                profileData.weight !== weight ||
                profileData.gender !== gender ||
                profileData.isShare !== isShare
            ) {
                setChangePIValue(true);
            } else {
                setChangePIValue(false);
            }
        }
    }, [name, height, weight, gender, isShare]);

    // Change PW FORM
    useEffect(() => {
        if (oldPassword || newPassword || repeatPassword) {
            setChangeCPValue(true);
        } else {
            setChangeCPValue(false);
        }
    }, [oldPassword, newPassword, repeatPassword]);
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
            setRepeatPassword(event.target.value);
        }
    };

    const handleOnChangeNewPassword = (event) => {
        if (unaccentedCharacters(event.target.value)) {
            setNewPassword(event.target.value);
        }
    };
    const handleCancelCP = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatPassword('');
    };

    const handleCPToastClose = () => {};
    const handlePIToastClose = () => {
        setPISuccess(false);
    };
    const handleSubmitCP = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.changePassword({ oldPassword, newPassword, repeatPassword }, token);

        if (results.isSuccess) {
            setCPSuccess(1);
            setOldPassword('');
            setNewPassword('');
            setRepeatPassword('');
        } else {
            setCPSuccess(0);
        }
    };
    const handleChangeShareAccount = () => {
        setIsShare((prev) => (prev === 1 ? 0 : 1));
    };
    return (
        <div className={cx('wrapper')}>
            <Card className={cx('card-item')}>
                <div className={cx('card-header')}>
                    <div className={cx('title')}>
                        Personal Information <FaRegUserCircle className={cx('title-icon')} />
                    </div>
                    <label className={cx('subtitle')}>
                        <input
                            type="checkbox"
                            value={isShare === 1 ? true : false}
                            checked={isShare === 1 ? true : false}
                            onChange={handleChangeShareAccount}
                        />
                        <span className={cx('checkmark')}></span>
                        Public your info
                    </label>
                </div>
                <div className={cx('card-body')}>
                    <Input
                        onChange={(event) => {
                            setName(event.target.value);
                            setChangePIValue(true);
                        }}
                        value={name}
                        title="Your name"
                        type="text"
                    />
                    <div className={cx('body-index')}>
                        <Input
                            onChange={handleOnchangeHeight}
                            value={height.toString()}
                            title="Your height"
                            type="text"
                            unit="cm"
                            className={cx('body-index-input')}
                        />
                        <Input
                            onChange={handleOnchangeWeight}
                            value={weight.toString()}
                            title="Your weight"
                            type="text"
                            unit="kg"
                            className={cx('body-index-input')}
                        />
                    </div>
                    <div className={cx('gender-button-container')}>
                        <label className={cx('gender-button', gender === 1 && 'selected')}>
                            <FaMale className={cx('gender-icon')} />
                            <input
                                type="radio"
                                name="gender"
                                value={1}
                                checked={gender === 1}
                                onChange={handleOnChangeGender}
                            />
                            Male
                        </label>
                        <label className={cx('gender-button', gender === 0 && 'selected')}>
                            <FaFemale className={cx('gender-icon')} />
                            <input
                                type="radio"
                                name="gender"
                                value={0}
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
            </Card>
            <Card className={cx('card-item')}>
                <div className={cx('card-header')}>
                    <div className={cx('title')}>
                        Change Password <RiLockPasswordFill className={cx('title-icon')} />
                    </div>
                </div>
                <div className={cx('card-body')}>
                    <Input
                        onChange={(event) => {
                            if (unaccentedCharacters(event.target.value)) {
                                setOldPassword(event.target.value);
                                setCPSuccess();
                            }
                        }}
                        value={oldPassword}
                        title="Your current password"
                        type="password"
                        errorCondition={CPSuccess === 0}
                        errorMessage="Incorrect current password. Please try again."
                    />

                    <Input
                        onChange={handleOnChangeNewPassword}
                        value={newPassword}
                        title="New password"
                        type="password"
                        errorCondition={invalidPassword(newPassword)}
                        errorMessage="Password must have at least 6 characters"
                    />

                    <Input
                        onChange={handleOnChangeConfirmPw}
                        value={repeatPassword}
                        title="Confirm new password"
                        type="password"
                        errorCondition={!invalidPassword(newPassword) && invalidConfirmPw(repeatPassword)}
                        errorMessage="Password confirmation does not match"
                    />
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
                            invalidConfirmPw(repeatPassword) ||
                            !repeatPassword ||
                            !newPassword ||
                            !oldPassword
                        }
                        primary
                        className={cx('custom-btn')}
                    >
                        Save
                    </Button>
                </div>
            </Card>
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
