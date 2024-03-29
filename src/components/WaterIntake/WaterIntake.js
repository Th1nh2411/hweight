import PropTypes from 'prop-types';
import styles from './WaterIntake.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WaterPlusIcon } from '../Icons';
import { IoWaterSharp } from 'react-icons/io5';
import * as profileService from '../../services/profileService';
import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import audios from '../../assets/audios';
const cx = classNames.bind(styles);

const WaterIntake = ({ data, className }) => {
    const maxWater = data.weight * 30;
    // const [water, setWater] = useState(parseInt(data.water));
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);
    const addBtnRef = useRef(null);
    const updateWaterData = async (data) => {
        const token = localStorage.getItem('token');
        const results = await profileService.updateWaterIntake(dayjs().format('YYYY-MM-DD'), data, token);
    };
    // useEffect(() => {
    //     setWater(parseInt(data.water));
    // }, [data]);
    const waterUI = useMemo(() => 160 - (data.water / maxWater) * 160, [data.water, maxWater]);
    const handleClickAddBtn = () => {
        setShowOptions(!showOptions);
    };
    const handleDocumentClick = (event) => {
        if (
            optionsRef.current &&
            !optionsRef.current.contains(event.target) &&
            !addBtnRef.current.contains(event.target)
        ) {
            setShowOptions(false);
        }
    };
    const handleAddWater = (extraWater) => {
        // setWater((prev) => prev + extraWater);
        new Audio(audios.drinkSound).play();
        updateWaterData({ water: data.water + extraWater });
        data.water = data.water + extraWater;
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('title')}>Water Intake</div>
            <div className={cx('cup')} style={{ backgroundPositionY: waterUI + 'px' }}>
                <Tippy
                    placement="bottom"
                    content={
                        data.water < maxWater
                            ? 'You should drink enough the recommended amount of daily water.'
                            : 'You have drunk the recommended amount of daily water.'
                    }
                >
                    <div className={cx('current-water')}>
                        <IoWaterSharp className={cx('icon')} /> {data.water} ml
                    </div>
                </Tippy>

                <div className={cx('daily-water-wrapper')}>
                    <div>Daily water</div>
                    <div className={cx('daily-water')}>
                        <IoWaterSharp className={cx('icon')} />
                        {maxWater} ml
                    </div>
                </div>
                <div ref={addBtnRef} onClick={handleClickAddBtn} className={cx('add-btn')}>
                    <WaterPlusIcon width="3rem" height="3rem" />
                    {showOptions && (
                        <div ref={optionsRef} className={cx('add-options')}>
                            <div className={cx('add-option')} onClick={() => handleAddWater(75)}>
                                <IoWaterSharp className={cx('icon')} />
                                75 ml
                            </div>
                            <div className={cx('add-option')} onClick={() => handleAddWater(150)}>
                                <IoWaterSharp className={cx('icon')} />
                                150 ml
                            </div>
                            <div className={cx('add-option')} onClick={() => handleAddWater(200)}>
                                <IoWaterSharp className={cx('icon')} />
                                200 ml
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WaterIntake;
