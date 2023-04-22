import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { HomeActiveIcon } from '../../components/Icons';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as profileService from '../../services/profileService';
import BMICal from '../../components/BMICal/BMICal';
import WaterIntake from '../../components/WaterIntake/WaterIntake';
import CalTracker from '../../components/CalTracker';

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

    return (
        <Card className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    Home
                    <HomeActiveIcon height="3.6rem" width="3.6rem" className={cx('title-icon')} />
                </div>
            </div>
            <div className={cx('body')}>
                <BMICal data={history} />
                <div className={cx('tracker-wrapper')}>
                    <WaterIntake data={history} />
                    <CalTracker data={history} />
                </div>
            </div>
        </Card>
    );
}

export default Home;
