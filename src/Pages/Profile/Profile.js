import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaFemale, FaMale } from 'react-icons/fa';
import { profile } from '../../services/profileService';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [profileData, setProfile] = useState({});
    const [height, setHeight] = useState('');
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState(1);
    useEffect(() => {
        const getProfileData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            const results = await profile(token);
            setProfile(results);
            setHeight(results.height);
            setWeight(results.weight);
            setName(results.name);
            setGender(results.gender);
        };
        getProfileData();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('card-item')}>
                <div className={cx('title')}>Personal information</div>
                <div className={cx('input-container')}>
                    <input
                        className={cx('form-input', name ? 'hasValue' : '')}
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
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
                            onChange={(event) => {
                                setHeight(event.target.value);
                            }}
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
                            onChange={(event) => {
                                setWeight(event.target.value);
                            }}
                        />
                        <p>Your weight</p>
                        <div className={cx('unit')}>kg</div>
                        <span>
                            <i />
                        </span>
                    </div>
                </div>
                <div className={cx('gender-button-container')}>
                    <label className={cx('gender-button', gender === '1' ? 'selected' : '')}>
                        <FaMale className={cx('gender-icon')} />
                        <input
                            type="radio"
                            name="gender"
                            value={1}
                            onChange={(event) => {
                                setGender(event.target.value);
                            }}
                        />
                        Male
                    </label>
                    <label className={cx('gender-button', gender === '0' ? 'selected' : '')}>
                        <FaFemale className={cx('gender-icon')} />
                        <input
                            type="radio"
                            name="gender"
                            value={0}
                            onChange={(event) => {
                                setGender(event.target.value);
                            }}
                        />
                        Female
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Profile;
