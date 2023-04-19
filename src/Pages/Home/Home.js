import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { HomeActiveIcon } from '../../components/Icons';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as profileService from '../../services/profileService';

const cx = classNames.bind(styles);

function Home() {
    const [history, setHistory] = useState({});
    const getHistoryData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.getProfile(token);
        setHistory(results);
    };

    useEffect(() => {
        getHistoryData();
    }, []);
    const BMI = useMemo(
        () => (history.weight / ((history.height / 100) * (history.height / 100))).toFixed(1),
        [history],
    );
    const type = useMemo(() => {
        if (BMI < 18.5) {
            return 0;
        } else if (BMI >= 18.5 && BMI <= 25) {
            return 1;
        } else {
            return 2;
        }
    }, [BMI]);
    const upperLimitW = useMemo(() => (25 * (history.height / 100) * (history.height / 100)).toFixed(1), [history]);
    const lowerLimitW = useMemo(() => (18.5 * (history.height / 100) * (history.height / 100)).toFixed(1), [history]);
    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Home
                    <HomeActiveIcon height="3.6rem" width="3.6rem" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('bmiCal-wrapper')}>
                    <div className={cx('bmiCal-header')}>
                        <div className={cx('bmiCal-num-wrapper')}>
                            <p
                                className={cx('bmiCal-num', {
                                    'bmiCal-under': type === 0,
                                    'bmiCal-nor': type === 1,
                                    'bmiCal-over': type === 2,
                                })}
                            >
                                {BMI}
                            </p>
                            <div className={cx('bmiCal-subtitle')}>
                                <div className={cx('bmiCal-BMI')}>BMI</div>
                                <div
                                    className={cx('bmiCal-status', {
                                        'bmiCal-under': type === 0,
                                        'bmiCal-nor': type === 1,
                                        'bmiCal-over': type === 2,
                                    })}
                                >
                                    {type === 0 ? 'UnderWeight' : type === 1 ? 'Normal' : 'Overweight'}
                                </div>
                            </div>
                        </div>
                        <ul className={cx('bmiCal-advice-wrapper')}>
                            <div className={cx('bmiCal-advice-title')}>Suggestions</div>
                            {type === 0 || type === 2 ? (
                                <>
                                    <li className={cx('bmiCal-advice')}>
                                        Healthy weight for you: {lowerLimitW} kgs - {upperLimitW} kgs.
                                    </li>
                                    <li className={cx('bmiCal-advice')}>
                                        {type === 0 ? 'Gain' : 'Lose'}{' '}
                                        {type === 0
                                            ? (lowerLimitW - history.weight).toFixed(1)
                                            : (history.weight - upperLimitW).toFixed(1)}{' '}
                                        kgs to reach a BMI of {type === 0 ? '18.5' : '25'} kg/m2.
                                    </li>
                                </>
                            ) : (
                                <li className={cx('bmiCal-advice')}>
                                    You currently have a balanced weight, please continue to maintain and sustain this
                                    weight level.
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className={cx('bmiCal-body')}>
                        <div className={cx('bmiCal-title')}>
                            <p className={cx('bmiCal-under')}>Underweight</p>
                            <p className={cx('bmiCal-nor')}>Normal</p>
                            <p className={cx('bmiCal-over')}>Overweight</p>
                        </div>
                        <div className={cx('bmiCal-line')}></div>
                        <div className={cx('bmiCal-index-wrapper')}>
                            <p className={cx('bmiCal-index')}>16.0</p>
                            <p className={cx('bmiCal-index')}>18.5</p>
                            <p className={cx('bmiCal-index')}>25.0</p>
                            <p className={cx('bmiCal-index')}>40.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Home;
