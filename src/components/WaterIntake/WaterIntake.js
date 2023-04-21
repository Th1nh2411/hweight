import PropTypes from 'prop-types';
import styles from './WaterIntake.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
const cx = classNames.bind(styles);

const WaterIntake = ({ data }) => {
    const [water, setWater] = useState(parseInt(data.water));
    const maxWater = 3700;
    const waterUI = useMemo(() => 125 - (water / maxWater) * 125, [water]);
    const handleClickAdd = () => {
        setWater((prev) => prev + 150);
    };
    console.log(water, waterUI, data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cup')} style={{ backgroundPositionY: waterUI + 'px' }}>
                <div onClick={handleClickAdd} className={cx('add-btn')}>
                    +
                </div>
            </div>
        </div>
    );
};

export default WaterIntake;
