import Card from '../../components/Card/Card';
import { HomeActiveIcon } from '../../components/Icons';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
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
                            <p className={cx('bmiCal-num')}>31.5</p>
                            <div className={cx('bmiCal-subtitle')}>
                                <div className={cx('bmiCal-BMI')}>BMI</div>
                                <div className={cx('bmiCal-status')}>Overweight</div>
                            </div>
                        </div>
                        <ul className={cx('bmiCal-advice-wrapper')}>
                            <div className={cx('bmiCal-advice-title')}>Suggestions</div>
                            <li className={cx('bmiCal-advice')}>Healthy weight for you: 59.9 kgs - 81.0 kgs.</li>
                            <li className={cx('bmiCal-advice')}>Lose 9.0 kgs to reach a BMI of 25 kg/m2.</li>
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
