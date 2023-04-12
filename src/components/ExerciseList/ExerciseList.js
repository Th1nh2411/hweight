import styles from './ExerciseList.module.scss';
import classNames from 'classnames/bind';
import { RiEditFill, RiQuestionLine } from 'react-icons/ri';
import RecipeItem from '../RecipeItem/RecipeItem';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import { FaUndo } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import Image from '../Image/Image';
import { HeartIcon } from '../Icons/Icons';
import * as exerciseService from '../../services/exerciseService';
import { BsChevronBarDown, BsFillCaretUpSquareFill } from 'react-icons/bs';

const cx = classNames.bind(styles);
function List({ data, className }) {
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [showDetail, setShowDetail] = useState(false);
    const handleClickWrapper = () => {
        setShowDetail(!showDetail);
    };
    const handleClickLike = () => {
        setIsLiked(!isLiked);
        const results = exerciseService.updateExercise(data.id, { isLiked: !isLiked });
    };
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <Image src={data.img} className={cx('img-wrapper')} />
                <div className={cx('detail')}>
                    <h5 className={cx('header-title')}>
                        {data.name}
                        <Tippy placement="bottom" content={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                            <div className={cx('like-icon-wrapper')}>
                                <HeartIcon
                                    onClick={handleClickLike}
                                    height="2.8rem"
                                    width="2.8rem"
                                    className={cx('like-icon', { isLiked })}
                                />
                            </div>
                        </Tippy>
                    </h5>
                    <div className={cx('subtitle')}>can reduce up to {data.calories} calories</div>
                    <div className={cx('info')}>{data.info}</div>
                    {!showDetail && (
                        <div className={cx('show-detail')} onClick={handleClickWrapper}>
                            <BsChevronBarDown className={cx('show-detail-icon')} />
                            Show mores
                        </div>
                    )}
                </div>
            </div>
            {showDetail && (
                <div
                    className={cx('body', { hide: !showDetail })}
                    onAnimationEnd={() => {
                        if (showDetail) setShowDetail(showDetail(false));
                    }}
                >
                    <h5 className={cx('body-title')}>Essential equipments</h5>
                    <BsFillCaretUpSquareFill className={cx('hide-btn')} onClick={() => setShowDetail(false)} />
                    <div className={cx('equipment-list')}>
                        {data.equipments.map((equipment, index) => (
                            <div key={index} className={cx('equipment-item')}>
                                <Image className={cx('equipment-img')} src={equipment.img} />
                                <div className={cx('equipment-name')}>{equipment.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
