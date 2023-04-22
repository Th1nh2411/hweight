import PropTypes from 'prop-types';
import styles from './CalTracker.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WaterPlusIcon } from '../Icons';
import { IoWaterSharp } from 'react-icons/io5';
import * as profileService from '../../services/profileService';
import Tippy from '@tippyjs/react';
import RadialChart from '../RadialChart';
import { RiQuestionLine } from 'react-icons/ri';
const cx = classNames.bind(styles);

const CalTracker = ({ data }) => {
    // const caloriesIn
    const [caloriesIn, setCaloriesIn] = useState(parseInt(data.calIn) || 0);
    const [caloriesOut, setCaloriesOut] = useState(parseInt(data.calOut) + data.calMin || 0);
    const BMI = useMemo(() => (data.weight / ((data.height / 100) * (data.height / 100))).toFixed(1), [data]);
    useEffect(() => {
        setCaloriesIn(parseInt(data.calIn));
        setCaloriesOut(parseInt(data.calOut) + data.calMin);
    }, [data]);
    console.log(BMI);
    const suggest = useMemo(() => {
        if (caloriesIn < data.calMin) {
            return 'You should eat more food to reach the required calories for your body';
        } else if (BMI > 25 && caloriesIn > caloriesOut) {
            return 'You should take more exercise to burn more calories and lose weight';
        } else if (BMI < 18.5 && caloriesOut > caloriesIn) {
            return 'You should eat more food to increase calories and gain weight';
        } else if (18.5 <= BMI && BMI <= 25 && caloriesIn > caloriesOut + 500) {
            return 'You should limit your food intake to keep your weight balanced';
        } else {
            return 'You are doing great';
        }
    }, [caloriesIn, data.calMin, BMI, caloriesOut]);

    console.log(caloriesIn, caloriesOut);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                Calories Tracker{' '}
                <Tippy placement="bottom" content={suggest}>
                    <div className={cx('warning-detail-icon')}>
                        <RiQuestionLine />
                    </div>
                </Tippy>
            </div>
            <div className={cx('chart-wrapper')}>
                <div className={cx('chart-body')}>
                    <RadialChart
                        className={cx('chart')}
                        progress={(caloriesIn * 100) / (data.calMin * 2)}
                        color="#6b42d7"
                        strokeWidth={20}
                        hideTotal={caloriesIn < data.calMin}
                        dimension={205}
                    />
                    <RadialChart
                        progress={50}
                        className={cx('chart', { under: caloriesIn < data.calMin })}
                        color="#5685df"
                        strokeWidth={20}
                        hideTotal={caloriesIn > data.calMin}
                        dimension={205}
                    />
                    <RadialChart
                        className={cx('chart')}
                        progress={(caloriesOut * 100) / (data.calMin * 2)}
                        color="#d75c42"
                        strokeWidth={20}
                        radius={65}
                    />
                    <RadialChart
                        className={cx('chart')}
                        progress={50}
                        color="var(--primary-color)"
                        strokeWidth={20}
                        radius={65}
                        hideTotal
                    />
                    <div className={cx('cal-num-wrapper')}>
                        <div className={cx('cal-num')} style={{ color: '#8d62ff' }}>
                            {caloriesIn}
                        </div>
                        <div className={cx('cal-num')} style={{ color: '#d75c42' }}>
                            {caloriesOut}
                        </div>
                    </div>
                </div>
                <div className={cx('desc-wrapper')}>
                    <div className={cx('desc-item')}>
                        <div className={cx('desc-color')} style={{ backgroundColor: '#5685df' }}></div>
                        <div className={cx('desc-title')}>Recommended daily calorie intake</div>
                    </div>
                    <div className={cx('desc-item')}>
                        <div className={cx('desc-color')} style={{ backgroundColor: 'var(--primary-color)' }}></div>
                        <div className={cx('desc-title')}>Calories your body burns at rest</div>
                    </div>
                    <div className={cx('desc-item')}>
                        <div className={cx('desc-color')} style={{ backgroundColor: '#6b42d7' }}></div>
                        <div className={cx('desc-title')}>Calories intake today</div>
                    </div>
                    <div className={cx('desc-item')}>
                        <div className={cx('desc-color')} style={{ backgroundColor: '#d75c42' }}></div>
                        <div className={cx('desc-title')}>Calories out today</div>
                    </div>
                </div>
            </div>
            {/* <div className={cx('suggest-list')}>
                <div className={cx('suggest-title')}>Suggestions</div>
                <div className={cx('suggest-item')}>
                    You should take more exercise to burn more calories and reach the amount of calories intake.
                </div>
            </div> */}
        </div>
    );
};

export default CalTracker;
