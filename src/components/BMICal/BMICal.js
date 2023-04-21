import PropTypes from 'prop-types';
import styles from './BMICal.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useEffect, useMemo, useRef, useState } from 'react';
const cx = classNames.bind(styles);

const BMICal = ({ data }) => {
    const BMI = useMemo(() => (data.weight / ((data.height / 100) * (data.height / 100))).toFixed(1), [data]);
    const type = useMemo(() => {
        if (BMI < 18.5) {
            return 0;
        } else if (BMI >= 18.5 && BMI <= 25) {
            return 1;
        } else {
            return 2;
        }
    }, [BMI]);
    const upperLimitW = useMemo(() => (25 * (data.height / 100) * (data.height / 100)).toFixed(1), [data]);
    const lowerLimitW = useMemo(() => (18.5 * (data.height / 100) * (data.height / 100)).toFixed(1), [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('num-wrapper')}>
                    <p
                        className={cx('num', {
                            under: type === 0,
                            nor: type === 1,
                            over: type === 2,
                        })}
                    >
                        {BMI}
                    </p>
                    <div className={cx('subtitle')}>
                        <div className={cx('BMI')}>BMI</div>
                        <div
                            className={cx('status', {
                                under: type === 0,
                                nor: type === 1,
                                over: type === 2,
                            })}
                        >
                            {type === 0 ? 'UnderWeight' : type === 1 ? 'Normal' : 'Overweight'}
                        </div>
                    </div>
                </div>
                <div className={cx('advice-wrapper')}>
                    <div className={cx('advice-title')}>Suggestions</div>
                    {type === 0 || type === 2 ? (
                        <>
                            <div className={cx('advice')}>
                                Healthy weight for you: {lowerLimitW} kgs - {upperLimitW} kgs.
                            </div>
                            <div className={cx('advice')}>
                                {type === 0 ? 'Gain' : 'Lose'}{' '}
                                {type === 0
                                    ? (lowerLimitW - data.weight).toFixed(1)
                                    : (data.weight - upperLimitW).toFixed(1)}{' '}
                                kgs to reach a BMI of {type === 0 ? '18.5' : '25'} kg/m2.
                            </div>
                        </>
                    ) : (
                        <div className={cx('advice')}>
                            You currently have a balanced weight, please continue to maintain and sustain this weight
                            level.
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('title')}>
                    <p className={cx('under')}>Underweight</p>
                    <p className={cx('nor')}>Normal</p>
                    <p className={cx('over')}>Overweight</p>
                </div>
                <div className={cx('line')}></div>
                <div className={cx('index-wrapper')}>
                    <p className={cx('index')}>16.0</p>
                    <p className={cx('index')}>18.5</p>
                    <p className={cx('index')}>25.0</p>
                    <p className={cx('index')}>40.0</p>
                </div>
            </div>
        </div>
    );
};

export default BMICal;
