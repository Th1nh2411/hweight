import styles from './ExerciseItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image';
import { Link } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { ClockIcon } from '../Icons';
import Tippy from '@tippyjs/react';
import * as RecipeService from '../../services/recipeService';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function Item({ data }) {
    const [showModalDetail, setShowModalDetail] = useState();
    const handleClickRecipe = () => {
        setShowModalDetail(true);
    };
    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);

        var hDisplay = h > 0 ? h + ':' : '';
        var mDisplay = m > 0 ? m + ':' : '';
        var sDisplay = s > 0 ? s + 's' : '00s';
        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <div>
            {showModalDetail && (
                <Modal className={cx('detail-wrapper')} handleCloseModal={() => setShowModalDetail(false)}>
                    <div className={cx('detail-body__name')}>{data.name}</div>
                    <div className={cx('detail-body__info')}>
                        Execution time <ClockIcon width="2.4rem" height="2.4rem" className={cx('clock-icon')} /> -
                        {'      '}
                        {secondsToHms(data.time)}
                    </div>

                    <div className={cx('detail-video')}>
                        <ReactPlayer controls width={800} url={data.video} />
                    </div>
                </Modal>
            )}
            <div onClick={handleClickRecipe} className={cx('wrapper')}>
                <div className={cx('info')}>
                    <Image src={data.img} alt={data.name} className={cx('img')} />
                    <div className={cx('desc')}>
                        <h4 id="name" className={cx('name')}>
                            {data.name}
                        </h4>
                        <h5 id="time-eat" className={cx('time')}>
                            {data.index} reps
                        </h5>
                    </div>
                </div>
                <div className={cx('more-btn')}>
                    <AiOutlineRightCircle />
                </div>
            </div>
        </div>
    );
}

export default Item;
