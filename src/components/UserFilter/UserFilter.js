import styles from './UserFilter.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks';

const cx = classNames.bind(styles);
function UserFilter({ onChangeFilter = () => {} }) {
    const minBMI = 0;
    const maxBMI = 60;
    const [minBMIValue, setMinBMIValue] = useState(minBMI);
    const [maxBMIValue, setMaxBMIValue] = useState(maxBMI);

    const debounceMinCalValue = useDebounce(minBMIValue);
    const debounceMaxCalValue = useDebounce(maxBMIValue);

    useEffect(() => {
        onChangeFilter(debounceMinCalValue, debounceMaxCalValue);
    }, [debounceMinCalValue, debounceMaxCalValue]);

    const calcLeftPosition = (value) => (100 / (maxBMI - minBMI)) * (value - minBMI);

    return (
        <div className={cx('filter-wrapper')}>
            <div className={cx('calories-filter')}>
                <div className={cx('filter-subtitle')}>BMI range : </div>
                <div className={cx('calories-filter-progressBar')}>
                    <div className={cx('range-slide')}>
                        <div className={cx('slide')}>
                            <div
                                className={cx('line')}
                                id="line"
                                style={{
                                    left: calcLeftPosition(minBMIValue) + '%',
                                    right: 100 - calcLeftPosition(maxBMIValue) + '%',
                                }}
                            ></div>
                            <span
                                className={cx('thumb')}
                                id="thumbMin"
                                style={{ left: calcLeftPosition(minBMIValue) + '%' }}
                            ></span>
                            <span
                                className={cx('thumb')}
                                id="thumbMax"
                                style={{ left: calcLeftPosition(maxBMIValue) + '%' }}
                            ></span>
                        </div>
                        <input
                            type="range"
                            min={minBMI}
                            max={maxBMI}
                            step={1}
                            value={minBMIValue}
                            onChange={(event) => {
                                if (parseInt(event.target.value) < parseInt(maxBMIValue)) {
                                    setMinBMIValue(event.target.value);
                                }
                            }}
                        />
                        <input
                            type="range"
                            min={minBMI}
                            max={maxBMI}
                            step={1}
                            value={maxBMIValue}
                            onChange={(event) => {
                                if (parseInt(event.target.value) > parseInt(minBMIValue)) {
                                    setMaxBMIValue(event.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className={cx('calories-display')}>
                        <span id="min" className={cx({ under: minBMIValue < 18.5, over: minBMIValue > 25 })}>
                            {minBMIValue}
                        </span>
                        <span id="max" className={cx({ under: maxBMIValue < 18.5, over: maxBMIValue > 25 })}>
                            {maxBMIValue}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFilter;
