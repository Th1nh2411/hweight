import styles from './ExerciseList.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Tippy from '@tippyjs/react';
import Image from '../Image/Image';
import { EvaluateIcon, HeartIcon } from '../Icons/Icons';
import * as exerciseService from '../../services/exerciseService';
import { BsChevronBarDown, BsChevronBarUp } from 'react-icons/bs';
import { HiClipboardDocumentCheck } from 'react-icons/hi2';
import { IoFitnessSharp } from 'react-icons/io5';
import ExerciseItem from '../../components/ExerciseItem';
import Modal from '../Modal/Modal';
import images from '../../assets/images';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';

const cx = classNames.bind(styles);
function List({ data, className, updateCalOut, onClickExercise }) {
    const [isLiked, setIsLiked] = useState(data.isLiked);
    const [showDetail, setShowDetail] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    // const [tab, setTab] = useState(0);
    // const [review, setReviewValue] = useState('');
    // const [leftLine, setLeftLine] = useState('');
    // const [widthLine, setWidthLine] = useState('');

    // const handleClickLike = (event) => {};
    // const handleChangeInput = (e) => {
    //     const searchValue = e.target.value;
    //     if (!searchValue.startsWith(' ')) {
    //         setReviewValue(searchValue);
    //     }
    // };
    // const handleClearReviewValue = () => {
    //     setReviewValue('');
    // };
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
                                updateCalOut(data.calories);
                            }}
                            primary
                        >
                            Confirm
                        </Button>
                    </div>
                </Modal>
            )}
            <div onClick={() => onClickExercise(data.id)} className={cx('wrapper', className)}>
                <Image src={data.img} className={cx('img-wrapper')} />
                <div className={cx('detail')}>
                    <h5 className={cx('header-title')}>
                        {data.name}
                        <Tippy placement="bottom" content={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
                            <div className={cx('like-icon-wrapper')}>
                                <HeartIcon
                                    onClick={(event) => {
                                        setIsLiked(!isLiked);
                                        const results = exerciseService.updateExercise(data.id, { isLiked: !isLiked });
                                        event.stopPropagation();
                                    }}
                                    height="2.8rem"
                                    width="2.8rem"
                                    className={cx('like-icon', { isLiked })}
                                />
                            </div>
                        </Tippy>
                    </h5>
                    <div
                        className={cx('done-btn')}
                        onClick={(event) => {
                            setShowConfirm(true);
                            event.stopPropagation();
                        }}
                    >
                        Done
                        <HiClipboardDocumentCheck className={cx('done-icon')} />
                    </div>
                    <div className={cx('subtitle')}>
                        can reduce up to {data.calories} calories{' '}
                        <div className={cx('likes-num', 'sep')}>
                            <HeartIcon className={cx('likes-icon')} height="1.6rem" width="1.6rem" />
                            {data.likes} likes
                        </div>
                    </div>
                    <div className={cx('info')}>{data.info}</div>
                </div>
            </div>
        </>
    );
}

export default List;
