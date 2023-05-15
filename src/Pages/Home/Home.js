import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card/Card';
import { HomeActiveIcon } from '../../components/Icons';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as profileService from '../../services/profileService';
import BMICal from '../../components/BMICal/BMICal';
import WaterIntake from '../../components/WaterIntake/WaterIntake';
import CalTracker from '../../components/CalTracker';
import { Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import config from '../../config';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const [history, setHistory] = useState({});
    const today = dayjs();
    const getHistoryData = async () => {
        const token = localStorage.getItem('token');
        const results = await profileService.getHistory(today.format('YYYY-MM-DD'), token);
        if (results.isSuccess === false) {
            navigate(config.routes.login);
        }
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
                <Row>
                    <Col>
                        <BMICal className={cx('content-wrapper')} data={history} />
                    </Col>
                </Row>
                <Row>
                    <Col xl={'auto'}>
                        <WaterIntake className={cx('content-wrapper')} data={history} />
                    </Col>
                    <Col>
                        <CalTracker className={cx('content-wrapper')} data={history} />
                    </Col>
                </Row>
            </div>
        </Card>
    );
}

export default Home;
