import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './RadialChart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const DEFAULT_COLOR = '#040404';

const RadialChart = ({ radius, progress, strokeWidth, dimension, color, hideTotal, className }) => {
    const [setStrokeLength, setSetStrokeLength] = useState(false);
    useEffect(() => {
        // For initial animation
        setTimeout(() => {
            setSetStrokeLength(true);
        });
    }, []);
    const circleRadius = Math.min(radius, 85);
    const circumference = 2 * 3.14 * circleRadius;
    const strokeLength = setStrokeLength ? (circumference / 100) * progress : 0;

    return (
        <div
            className={cx('radial-chart', className, {
                'no-progress': strokeLength === 0,
            })}
        >
            <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
                {!hideTotal && (
                    <circle
                        className={cx('radial-chart-total')}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        cx="90"
                        cy="90"
                        r={circleRadius}
                    />
                )}
                <circle
                    className={cx('radial-chart-progress')}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${strokeLength},${circumference}`}
                    strokeLinecap="round"
                    fill="none"
                    cx="90"
                    cy="90"
                    r={circleRadius}
                />
            </svg>
        </div>
    );
};

RadialChart.defaultProps = {
    radius: 80,
    progress: 100,
    strokeWidth: 10,
    dimension: 180,
    hideTotal: false,
    color: DEFAULT_COLOR,
};

RadialChart.propTypes = {
    className: PropTypes.string,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    color: PropTypes.string,
    progress: PropTypes.number,
    dimension: PropTypes.number,
};

export default RadialChart;
