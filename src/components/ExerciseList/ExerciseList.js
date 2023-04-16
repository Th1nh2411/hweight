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
import {
    BsCheckAll,
    BsChevronBarDown,
    BsChevronBarUp,
    BsClipboardCheck,
    BsFillCaretUpSquareFill,
} from 'react-icons/bs';
import ExerciseItem from '../../components/ExerciseItem';
import { FALSE } from 'sass';
import Modal from '../Modal/Modal';
import images from '../../assets/images';
import * as historyService from '../../services/historyService';

const cx = classNames.bind(styles);
function List({ data, className, updateCaloOut }) {
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [showDetail, setShowDetail] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClickWrapper = () => {
        setShowDetail(!showDetail);
    };
    const handleClickLike = () => {
        setIsLiked(!isLiked);
        const results = exerciseService.updateExercise(data.id, { isLiked: !isLiked });
    };

    return (
        <>
            {showConfirm && (
                <Modal className={cx('confirm-wrapper')} handleCloseModal={() => setShowConfirm(false)}>
                    <div className={cx('confirm-img-wrapper')}>
                        <Image className={cx('confirm-img')} src={images.running} />
                    </div>
                    <div className={cx('confirm-title')}>
                        Confirm that you have done this exercise? The amount of calories out when doing this exercise is{' '}
                        {data.calories} calories
                    </div>
                    <div className={cx('confirm-btn-wrapper')}>
                        <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
                        <Button
                            onClick={() => {
                                setShowConfirm(false);
                                updateCaloOut(data.calories);
                            }}
                            primary
                        >
                            Confirm
                        </Button>
                    </div>
                </Modal>
            )}
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
                        <div
                            className={cx('done-btn')}
                            onClick={() => {
                                setShowConfirm(true);
                            }}
                        >
                            Done
                            <BsClipboardCheck className={cx('done-icon')} />
                        </div>
                        <div className={cx('subtitle')}>can reduce up to {data.calories} calories</div>
                        <div className={cx('info')}>{data.info}</div>
                        <div className={cx('show-detail', { show: showDetail })} onClick={handleClickWrapper}>
                            {!showDetail ? (
                                <BsChevronBarDown className={cx('show-detail-icon')} />
                            ) : (
                                <BsChevronBarUp className={cx('show-detail-icon')} />
                            )}
                            {!showDetail ? 'View more' : 'View less'}
                        </div>
                    </div>
                </div>
                {showDetail && (
                    <div className={cx('body')}>
                        <h5 className={cx('body-title')}>Essential equipments</h5>
                        <div className={cx('equipment-list')}>
                            {data.equipments.map((equipment, index) => (
                                <div key={index} className={cx('equipment-item')}>
                                    <Image className={cx('equipment-img')} src={equipment.img} />
                                    <div className={cx('equipment-name')}>{equipment.name}</div>
                                </div>
                            ))}
                        </div>
                        {data.sets.map((set, index) => (
                            <div key={index}>
                                <h5 className={cx('body-title')}>Set {index + 1}</h5>
                                {set.map((movement, index) => (
                                    <ExerciseItem key={index} data={movement} />
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default List;
